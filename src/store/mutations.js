import defaultState from './state';
import prettyLog from '@/helpers/methods';

const mutations = {
	SET_DARK_MODE(state, isEnabled) {
		state.percist.darkMode = isEnabled;
	},

	SET_ORDER_BY(state, orderBy) {
		state.percist.orderBy = orderBy;
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

	ACTIVATE_ITEM(state, index) {
		state.songs[index].open = true;
		setTimeout(() => {
			state.songs[index].open = false;
		}, 500);
	},


	// fetch any possible store data stored in the localstorage and restore it into the actual store
	RELOAD_FROM_LOCALSTORAGE(state) {
		const localStore = JSON.parse(localStorage.getItem('percistantStorage'));

		state.percist = { ...defaultState.percist, ...localStore } || defaultState.percist;

		prettyLog('setlist', 'store', 'Realoaded percistent state');
	}
};

export default mutations;