import { getDefaultState } from './state';
import { prettyLog } from '@/helpers/methods';
import Vue from 'vue';
import { updateField } from 'vuex-map-fields';

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
	},

	SET_SUGGESTIONS(state, suggestions) {
		state.suggestionsSongs = suggestions.song;
		state.suggestionsArtists = suggestions.artist;
	},

	SET_PAGE(state, value) {
		state.page = value;
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

	SET_ARRANGEMENTS_FILTER(state, arrangements) {
		state.searchSettings.arrangements = arrangements;
	},
	SET_ARRANGEMENTS_FILTER_KEY(state, { key, value }) {
		Vue.set(state.searchSettings.arrangements, key, value);
	},
	RESET_FORM(state) {
		const defaultForm = { ...getDefaultState().searchSettings };

		delete defaultForm.search;
		state.searchSettings = defaultForm;
		state.searchSettings.arrangements = defaultForm.arrangements;
	},
	SET_API_ERROR(state, error) {
		state.apiError = error;
	},
	SET_LOADING(state, value) {
		state.isLoading = value;
	},
	SET_LAST_PAGE(state, value) {
		state.isLastPage = value;
	},
	SET_LAST_ACCEPTED_RULE_VERSION(state, value) {
		state.percist.lastAcceptedRuleVersion = value;
	},

	// fetch any possible store data stored in the localstorage and restore it into the actual store
	RELOAD_FROM_LOCALSTORAGE(state) {
		const localStore = JSON.parse(localStorage.getItem('percistantStorage'));

		state.percist = { ...getDefaultState().percist, ...localStore } || getDefaultState().percist;

		prettyLog('setlist', 'store', 'Realoaded percistent state');
	},

	updateField
};

export default mutations;