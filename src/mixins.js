const mixin = {
	methods: {
		// generates uuid, see : https://gist.github.com/jed/982883
		uuid: () => function b(a) {
			return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
		}(),
		/**
		 * allow gracefull i18n fallback if the key is not found
		 * @param {String} root where to look for the i18n key, not returned if nothing is found
		 * @param {String} key i18n key to look for, return as is if nothing is found
		 * @returns {String} displayable string (raw key or corresponding i18n value)
		 */
		i18nFallback: function(root, key) {
			if (key) {
				const template = `${ root }.${ key }`;

				const i18n = this.$t(template);

				return i18n !== template ? i18n : key;
			}
			else {
				return '';
			}
		}
	}
};

export default mixin;