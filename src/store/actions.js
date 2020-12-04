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

			commit('SET_SONG_LIST', response.obj.data);
			commit('INCREMENT_PAGE');
			// erase api errors
			commit('SET_API_ERROR', undefined);
		}
		catch (error) {
			commit('SET_API_ERROR', error);
			console.error(error);
		}
	},

	async getMoreSongs({ commit, getters }) {
		try {
			if (getters.getPage > 0) {
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

				commit('ADD_SONGS_TO_LIST', response.obj.data);
				commit('INCREMENT_PAGE');

			}
			else {
				prettyLog('setlist', 'API', 'First page of song not yet loaded, abord loading more songs');
			}
		}
		catch (error) {
			console.error(error);
			// save API error
			commit('SET_API_ERROR', error);
		}
	},

	async refreshList({ commit, dispatch }) {
		try {
			prettyLog('setlist', 'API', 'Realoading list');

			// reset page number to 0 (first page)
			commit('SET_PAGE', 0);

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
			commit('SET_IS_SEARCH', true);

			// get the first page
			dispatch('getSongList');
		}
		catch (error) {
			console.error(error);
		}
	}

};

export default actions;