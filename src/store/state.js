export function getDefaultState() {
	return {
		songs: [],
		page: 0,
		percist: {
			darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
			orderBy: [
				{ name:'name', direction:'', weight:0 },
				{ name:'album', direction:'', weight:0 },
				{ name:'artist', direction:'', weight:0 },
				{ name:'update_date', direction:'', weight:0 }
			]
		},
		searchSettings:{
			search: '',
			lastInterpretation: [0, 100],
			interpretationNumber: [0, 100],
			score: [0, 100],
			arrangements: { 'rhythm': false, 'lead': false, 'bass': false },
			showlights: false,
			vocals: false,
			odlc: false,
			cdlc: false
		},
		orderByRandomSeed: Date.now(),
		apiError: undefined,
		isLoading: false,
		isLastPage: false,
		suggestionsSongs: [],
		suggestionsArtists: []
	};
}

const state = getDefaultState();

export default state;