import SwaggerClient from 'swagger-client';



const actions = {
	async getSongList({ commit }) {
		try {
			console.log('%c setlist %c API %c   Loading songs', 'background: #583A94; color:#fff; border-radius:3px 0 0 3px', 'background: lightblue; color:#404040; border-radius:0 3px 3px 0', 'background: none');
			new SwaggerClient(process.env.VUE_APP_SWAGGER_PATH)
				.then(client => client.apis.public.songs_get())
				.then(response => {
					commit('SET_SONG_LIST', response.obj.data);
					commit('INCREMENT_PAGE');
				});
		}
		catch (error) {
			console.error(error);
		}
	},
	async getMoreSongs({ commit, getters }) {
		try {
			if (getters.getPage > 0) {
				console.log('%c setlist %c API %c   Loading more songs', 'background: #583A94; color:#fff; border-radius:3px 0 0 3px', 'background: lightblue; color:#404040; border-radius:0 3px 3px 0', 'background: none');
				// const { data } = await query({ operationId:'songs.get', data:{ padding: getters.getPage * 50 } });
				new SwaggerClient(process.env.VUE_APP_SWAGGER_PATH)
					.then(client => client.apis.public.songs_get({ padding: getters.getPage * 50 }))
					.then(response => {

						commit('ADD_SONGS_TO_LIST', response.obj.data);
						commit('INCREMENT_PAGE');
					});
			}
			else {
				console.log('%c setlist %c API %c   no songs loaded waiting for first page', 'background: #583A94; color:#fff; border-radius:3px 0 0 3px', 'background: lightblue; color:#404040; border-radius:0 3px 3px 0', 'background: none');
			}
		}
		catch (error) {
			console.error(error);
		}
	}

};

export default actions;