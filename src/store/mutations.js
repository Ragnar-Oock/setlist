const mutations = {
	SET_DARK_MODE(state, isEnabled) {
		state.darkMode = isEnabled;
	},

	/**
	 * add a list of song at the end of the current list
	 * @param {Object} state Vuex state
	 * @param {Object[]} songList array of songs to be added to the list
	 */
	ADD_SONGS_TO_LIST(state, songList) {
		state.songs = [... state.songs, ...songList];
	},

	/**
	 * update the list of songs
	 * @param {Object} state Vuex state
	 * @param {Object[]} songList array of songs to be added to the list
	 */
	SET_SONG_LIST(state, songList) {
		state.songs = songList;
	},

	INCREMENT_PAGE(state) {
		state.page += 1;
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