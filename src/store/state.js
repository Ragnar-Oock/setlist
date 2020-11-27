const state = {
	songs: [],
	page: 0,
	orderBy: [
		{ name:'title', direction:'', weight:0 },
		{ name:'album', direction:'', weight:0 },
		{ name:'artist', direction:'', weight:0 },
		{ name:'new', direction:'', weight:0 }
	],
	percist: {
		darkMode: false
	}
};

export default state;