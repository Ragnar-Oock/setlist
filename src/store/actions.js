import { query } from './api/swagger';

const actions = {
	async getSongList({ commit }) {
		try {
			const { data } = await query({ operationId:'songs.get' });

			commit('SET_SONG_LIST', data.data);
		}
		catch (error) {
			console.error(error);
		}
	},
	async getMoreSongs({ commit, getters }) {
		try {
			// eslint-disable-next-line no-useless-concat
			console.log('%c setlist %c   Loading more songs', 'background: #583A94; color:#fff; border-radius:3px', 'background: none');
			const { data } = await query({ operationId:'songs.get', data:{ padding: getters.getPage * 50 } });

			commit('ADD_SONGS_TO_LIST', data.data);
		}
		catch (error) {
			console.error(error);
		}
	}

};

export default actions;