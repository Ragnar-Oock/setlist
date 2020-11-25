/**
 * Part of this file comme from this article on vue-i18n
 * https://medium.com/i18n-and-l10n-resources-for-developers/the-ultimate-guide-to-vue-localization-with-vue-i18n-bf98b1d40c65
 */

export const supportedLocales = {
	fr: 'Français',
	en: 'English'
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

export function supportedLocalesInclude(locale) {
	return Object.keys(supportedLocales).includes(locale);
}