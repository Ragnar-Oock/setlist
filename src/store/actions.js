import SwaggerClient from 'swagger-client';
import prettyLog from '@/helpers/methods';


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

			const response = await client.apis.public.songs_get(
				{
					limit: process.env.VUE_APP_DEFAULT_PAGE_LENGTH,
					...getters.getOrderByOrSeed
				});

			commit('SET_SONG_LIST', response.obj.data);
			commit('INCREMENT_PAGE');
		}
		catch (error) {
			console.error(error);
		}
	},

	async getMoreSongs({ commit, getters }) {
		try {
			if (getters.getPage > 0) {
				prettyLog('setlist', 'API', 'Loading more songs');

				const client = await getClient();

				const response = await client.apis.public.songs_get(
					{
						limit: process.env.VUE_APP_DEFAULT_PAGE_LENGTH,
						padding: getters.getPage * process.env.VUE_APP_DEFAULT_PAGE_LENGTH,
						...getters.getOrderByOrSeed
					});

				commit('ADD_SONGS_TO_LIST', response.obj.data);
				commit('INCREMENT_PAGE');

			}
			else {
				prettyLog('setlist', 'API', 'First page of song not yet loaded, abord loading more songs');
			}
		}
		catch (error) {
			console.error(error);
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
	}

};

export default actions;