// vue.config.js
module.exports = {
	publicPath: process.env.NODE_ENV === 'production'
		? '/static/setlist/'
		: '/',

	pluginOptions: {
		i18n: {
			locale: 'fr',
			fallbackLocale: 'fr',
			localeDir: 'lang',
			enableInSFC: false
		}
	}
};
