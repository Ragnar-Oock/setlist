const state = {
	songs: [],
	page: 0,
	percist: {
		darkMode: false,
		orderBy: [
			{ name:'name', direction:'', weight:0 },
			{ name:'album', direction:'', weight:0 },
			{ name:'artist', direction:'', weight:0 },
			{ name:'new', direction:'', weight:0 }
		]
	}
};

export default state;