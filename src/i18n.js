import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { supportedLocalesInclude } from '@/lang/supported';

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

function getStartingLocale() {
	const browserLocale = getBrowserLocale({ countryCodeOnly: true });
	const savedLocale = getSavedLocal();

	// if a lang was shousen by the user use it
	// otherwise use the browser local
	// fallback to the app local if previous options are not satifisable
	// if everithing else fail, use french
	if (savedLocale !== '' && supportedLocalesInclude(savedLocale)) {
		return savedLocale;
	}
	else if (supportedLocalesInclude(browserLocale)) {
		return browserLocale;
	}
	else {
		return process.env.VUE_APP_I18N_LOCALE || 'fr';
	}
}

export default new VueI18n({
	locale: getStartingLocale(),
	fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'fr',
	messages: loadLocaleMessages()
});
