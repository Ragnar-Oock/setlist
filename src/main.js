import Vue from 'vue';
import App from './App.vue';

// Vuex Store
import store from './store/index.js';

Vue.config.productionTip = false;

// Local storage
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

import mixins from './mixins';

import VueTippy, { TippyComponent } from 'vue-tippy';
import i18n from './i18n';

Vue.use(VueTippy);
Vue.component('tippy', TippyComponent);


// enable devtools in prod
Vue.config.devtools = true;

new Vue({
	mixins: [mixins],
	render: h => h(App),
	i18n,
	store
}).$mount('#app');
