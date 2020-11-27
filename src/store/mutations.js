import defaultState from './state';

const mutations = {
	SET_DARK_MODE(state, isEnabled) {
		state.percist.darkMode = isEnabled;
	},

	SET_ORDER_BY(state, orderBy) {
		state.orderBy = orderBy;
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
		state.pag = 1;
	},

	INCREMENT_PAGE(state) {
		state.page += 1;
	},


	// fetch any possible store data stored in the localstorage and restore it into the actual store
	RELOAD_FROM_LOCALSTORAGE(state) {
		const localStore = JSON.parse(localStorage.getItem('percistantStorage'));

		state.percist = localStore || defaultState.percist;

		console.log('%c setlist %c store %c   Realoaded precistent state', 'background: #583A94; color:#fff; border-radius:3px 0 0 3px', 'background: lime; color:#404040; border-radius:0 3px 3px 0', 'background: none');
	}
};

export default mutations;