import tippy, { animateFill } from 'tippy.js';
import 'tippy.js/dist/backdrop.css';
import 'tippy.js/animations/shift-away.css';
import 'tippy.js/dist/tippy.css';

const defaultConfig = {
	plugins: [animateFill],
	animateFill: true
};

const plugin = {
/**
 * add tippy as a vue plugin
 * @param {Object} Vue Vue instance to add the plugin too
 * @param {Object} options distionnary of default options to pass to the tippy instance
 */
	// eslint-disable-next-line no-undef
	install(Vue, options) {
		console.log(tippy);
		tippy.setDefaultProps({
			...options
		});
		Vue.prototype.$tippy = function (targets, optionalProps) {
			tippy(targets, {
				...defaultConfig,
				...optionalProps
			});
		};

		Vue.directive('tippy', {
			inserted: function (el, binding) {
				tippy(el, {
					...defaultConfig,
					...binding.value
				});
			}
		});
	}
};

export default plugin;