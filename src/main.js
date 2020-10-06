import Vue from 'vue';
import App from './App.vue';

// Vuex Store
import store from './store/index.js';

Vue.config.productionTip = false;

// Local storage
store.commit('RELOAD_FROM_LOCALSTORAGE');
store.subscribe((mutation, state) => {
	try {
		localStorage.setItem('store', JSON.stringify(state));
	}
	catch (error) {
		// may log an error on safary if setItem fail
		console.log(error);
	}
});

import mixins from './mixins';

new Vue({
	mixins: [mixins],
	render: h => h(App),
	store
}).$mount('#app');
