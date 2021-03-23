import SwaggerClient from 'swagger-client';
import { prettyLog } from '@/helpers/methods';

// get the spec, prse it, return and cache the result for future calls
function getClient() {
	return new Promise((resolve, reject) => {
		if (getClient.cachedClient) {
			resolve(getClient.cachedClient);
		}
		else {
			new SwaggerClient(process.env.VUE_APP_SWAGGER_PATH)
				.then(client => {
					getClient.cachedClient = client;
					resolve(client);
				})
				.catch(e => reject(e));
		}
	});
}

const actions = {
	async getSongList({ commit, getters }) {
		try {
			commit('SET_LOADING', true);
			commit('SET_LAST_PAGE', false);
			prettyLog('setlist', 'API', 'Loading songs');

			const client = await getClient();

			let response;

			if (getters.isSearch) {
				response = await client.apis.public.search_get({
					limit: process.env.VUE_APP_DEFAULT_PAGE_LENGTH,
					orderby: getters.getOrderByAsText,
					...getters.getSearchParams
				});
			}
			else {
				response = await client.apis.public.songs_get({
					limit: process.env.VUE_APP_DEFAULT_PAGE_LENGTH,
					...getters.getOrderByOrSeed
				});
			}

			// store response
			commit('SET_SONG_LIST', response.obj.data);
			// is the resived page the last?
			if (response.obj.data.length < Number(process.env.VUE_APP_DEFAULT_PAGE_LENGTH)) {
				commit('SET_LAST_PAGE', true);
			}

			// increment page counter
			commit('INCREMENT_PAGE');
			// erase api errors
			commit('SET_API_ERROR', undefined);
			// hide loader
			commit('SET_LOADING', false);

		}
		catch (error) {
			commit('SET_API_ERROR', error);
			commit('SET_LOADING', false);
			console.error(error);
		}
	},

	async getMoreSongs({ commit, getters }) {
		try {
			if (!getters.isLastPage) {
				if (getters.getPage > 0) {
					// show the loader
					commit('SET_LOADING', true);
					prettyLog('setlist', 'API', 'Loading more songs');

					const client = await getClient();
					let response;

					if (getters.isSearch) {
						response = await client.apis.public.search_get({
							limit: process.env.VUE_APP_DEFAULT_PAGE_LENGTH,
							padding: getters.getPage * process.env.VUE_APP_DEFAULT_PAGE_LENGTH,
							orderby: getters.getOrderByAsText,
							...getters.getSearchParams
						});
					}
					else {
						response = await client.apis.public.songs_get({
							limit: process.env.VUE_APP_DEFAULT_PAGE_LENGTH,
							padding: getters.getPage * process.env.VUE_APP_DEFAULT_PAGE_LENGTH,
							...getters.getOrderByOrSeed
						});
					}

					// store response
					commit('ADD_SONGS_TO_LIST', response.obj.data);
					// is the resived page the last?
					if (response.obj.data.length < Number(process.env.VUE_APP_DEFAULT_PAGE_LENGTH)) {
						commit('SET_LAST_PAGE', true);

					}

					// increment page counter
					commit('INCREMENT_PAGE');
					// hide loader
					commit('SET_LOADING', false);
				}
				else {
					prettyLog('setlist', 'API', 'First page of song not yet loaded, abord loading more songs');
				}
			}
			else {
				prettyLog('setlist', 'API', 'End of list reached, abort loading more songs');
			}
		}
		catch (error) {
			console.error(error);
			// save API error
			commit('SET_API_ERROR', error);
			// hide the loader
			commit('SET_LOADING', false);

		}
	},

	async refreshList({ commit, dispatch }) {
		try {
			prettyLog('setlist', 'API', 'Realoading list');

			// reset page number to 0 (first page)
			commit('SET_PAGE', 0);
			// clear the list
			commit('SET_SONG_LIST', []);
			// get the first page
			dispatch('getSongList');
		}
		catch (error) {
			console.error(error);
		}
	},

	async getSearch({ commit, dispatch }) {
		try {
			prettyLog('setlist', 'API', 'Begining search');

			// reset page number to 0 (first page)
			commit('SET_PAGE', 0);
			// empty the song list
			commit('SET_SONG_LIST', []);

			// get the first page
			dispatch('getSongList');
		}
		catch (error) {
			console.error(error);
		}
	},

	async getSuggestions({ commit, getters }) {
		try {
			prettyLog('setlist', 'API', 'Get suggestions');

			const client = await getClient();

			const response = await client.apis.public.search_suggestion_get({
				limit: process.env.VUE_APP_DEFAULT_PAGE_LENGTH,
				...getters.getSearchParams
			});

			commit('SET_SUGGESTIONS', response.obj.data);
		}
		catch (error) {
			console.error(error);
		}
	},

	async activateItem({ commit }, index) {
		commit('TOGGLE_ITEM_ACTIVITY', { index, value: true });
		await new Promise(resolve => setTimeout(() => {
			commit('TOGGLE_ITEM_ACTIVITY', { index, value: false });
			resolve();
		}, 500));
	},

	async toggleItem({ commit, dispatch }, { index, value = true }) {
		commit('SET_ITEM_OPEN_STATE', { index: index, value: value });
		dispatch('activateItem', index);
	}

};

export default actions;