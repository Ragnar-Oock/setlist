import Vue from 'vue';
import App from './App.vue';

// Vuex Store
import store from './store/index.js';

// reload percistend local storage
store.commit('RELOAD_FROM_LOCALSTORAGE');
store.subscribe((mutation, state) => {
	try {
		localStorage.setItem('percistantStorage', JSON.stringify(state.percist));
	}
	catch (error) {
		// may log an error on safary if setItem fail
		console.log(error);
	}
});

// custom tippy plugin
import TippyPlugin from './helpers/tippy-plugin';
Vue.use(TippyPlugin);

// Portal Vue
import PortalVue from 'portal-vue';
Vue.use(PortalVue);

// custom mixins
import mixins from './mixins';

// i18n plugin
import i18n from './i18n';

new Vue({
	mixins: [mixins],
	render: h => h(App),
	i18n,
	store
}).$mount('#app');
