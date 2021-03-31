import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { supportedLocalesInclude } from '@/lang/supported';
import { getUrlPrameters } from './helpers/methods';

Vue.use(VueI18n);

function loadLocaleMessages () {
	const locales = require.context('./lang', true, /[A-Za-z0-9-_,\s]+\.json$/i);
	const messages = {};

	locales.keys().forEach(key => {
		const matched = key.match(/([A-Za-z0-9-_]+)\./i);

		if (matched && matched.length > 1) {
			const locale = matched[1];

			messages[locale] = locales(key);
		}
	});

	return messages;
}

export function getBrowserLocale(options = {}) {
	const defaultOptions = { countryCodeOnly: false };

	const opt = { ...defaultOptions, ...options };

	const navigatorLocale =
		navigator.languages !== undefined
			? navigator.languages[0]
			: navigator.language;

	if (!navigatorLocale) {
		return undefined;
	}

	const trimmedLocale = opt.countryCodeOnly
		? navigatorLocale.trim().split(/-|_/)[0]
		: navigatorLocale.trim();

	return trimmedLocale;
}

export function getSavedLocal() {
	return localStorage.getItem('langLocal') || '';
}

function getForcedLocal() {
	return getUrlPrameters().lang || '';
}

function getStartingLocale() {
	const browserLocale = getBrowserLocale({ countryCodeOnly: true });
	const savedLocale = getSavedLocal();
	const forcedLocale = getForcedLocal();

	// if the lang is set in the url use ir
	// else if a lang was chosen by the user use it
	// else use the browser local
	// fallback to the app local if previous options are not satifisable
	// if everithing else fail, use english
	if (forcedLocale !== '' && supportedLocalesInclude(forcedLocale)) {
		return forcedLocale;
	}
	else if (savedLocale !== '' && supportedLocalesInclude(savedLocale)) {
		return savedLocale;
	}
	else if (supportedLocalesInclude(browserLocale)) {
		return browserLocale;
	}
	else {
		return process.env.VUE_APP_I18N_LOCALE;
	}
}

export default new VueI18n({
	locale: getStartingLocale(),
	fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
	messages: loadLocaleMessages(),
	silentTranslationWarn: true
});
