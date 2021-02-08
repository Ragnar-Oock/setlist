
// const ESLintPlugin = require('eslint-webpack-plugin');
// const path = require('path');

module.exports = {
	// resolve: {
	// 	alias: {
	// 		'js-yaml': path.resolve(__dirname, './src/mock/js-yaml.js')
	// 	}
	// },

	externals: {
		esprima: 'esprima',
		'js-yaml': 'jsyaml'
	},
	// plugins: [new ESLintPlugin()],
	output: './build'
};