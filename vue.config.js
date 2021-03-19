// vue.config.js

const path = require('path');

module.exports = {
	publicPath: process.env.VUE_APP_PUBLIC_PATH,

	pluginOptions: {
		i18n: {
			locale: 'fr',
			fallbackLocale: 'fr',
			localeDir: 'lang',
			enableInSFC: false
		}
	},
	configureWebpack: {
		module: {
			rules: [
				{
					test: /\.vue$/,
					use: [
						{
							loader: 'vue-svg-inline-loader'
						}
					]
				}
			]
		},
		resolve: {
			alias: {
				'js-yaml': path.resolve(__dirname, './src/mock/js-yaml.js')
			}
		}
	}
};
