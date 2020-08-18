const mutations = {
	SET_DARK_MODE(state, isEnabled) {
		state.darkMode = isEnabled;
	},
	// fetch any possible store data stored in the localstorage and restore it into the actual store
	RELOAD_FROM_LOCALSTORAGE(state) {
		const localStore = JSON.parse(localStorage.getItem('store'));

		// following commented code is used to validate a JSON Web Token to check if the retrieved data should be restored or not
		// if (localStorage.getItem('store')) {
		// 	let tokenHasExpired = false;

		// 	try {
		// 		const token = localStore.token;
		// 		const base64Url = token.split('.')[1];
		// 		const base64Content = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		// 		const payload = JSON.parse(atob(base64Content));

		// 		tokenHasExpired = payload && (payload.exp < Date.now() / 1000);
		// 	}
		// 	catch (e) {
		// 		tokenHasExpired = true;
		// 	}

		// 	if (!tokenHasExpired) {
		this.replaceState(Object.assign(state, localStore));
		// 	}
		// }
	}
};

export default mutations;