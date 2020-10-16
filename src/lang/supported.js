/**
 * Part of this file comme from this article on vue-i18n
 * https://medium.com/i18n-and-l10n-resources-for-developers/the-ultimate-guide-to-vue-localization-with-vue-i18n-bf98b1d40c65
 */

export const supportedLocales = {
	en: 'English',
	fr: 'Français'
};

export function getSupportedLocales() {
	const annotatedLocales = [];

	for (const code of Object.keys(supportedLocales)) {
		annotatedLocales.push({
			code,
			name: supportedLocales[code]
		});
	}

	return annotatedLocales;
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

export function supportedLocalesInclude(locale) {
	return Object.keys(supportedLocales).includes(locale);
}