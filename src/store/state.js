const state = {
	songs: [],
	page: 0,
	percist: {
		darkMode: false,
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
		showlight: false,
		vocals: false,
		odlc: false,
		cdlc: false
	},
	orderByRandomSeed: Date.now()
};

export default state;