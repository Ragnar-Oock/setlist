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
		},
		/**
		 * infer the font color from the background color to maximise the contrast
		 * @param {String} bgc color of the background
		 */
		calcColor(bgc) {
			function invertColor(color) {
				let prefix = '';

				if (color.includes('#')) {
					prefix = '#';
					color = color.substring(1, 7);
				}

				const r = color.slice(0, 2);
				const g = color.slice(2, 4);
				const b = color.slice(4, 6);

				color = invertChannel(r) + invertChannel(g) + invertChannel(b);

				return prefix + color;
			}

			function invertChannel(channel) {
				let c = parseInt(channel, 16);

				c = 255 - c;
				c = c.toString(16);

				return c;
			}

			function colorToBW(color) {
				let prefix = '';

				if (color.includes('#')) {
					prefix = '#';
					color = color.substring(1, 7);
				}

				color =
				(parseInt(color.slice(0, 2), 16) +
					parseInt(color.slice(2, 4), 16) +
					parseInt(color.slice(4, 6), 16)) /
					3 >
				127
					? 'ffffff'
					: '000000';

				return prefix + color;
			}

			return colorToBW(invertColor(bgc));
		}
	}
};

export default mixin;