const getters = {
	getPage: state => state.page,
	isDarkModeOn: state => state.percist.darkMode,
	getOrderByAsText: state => {
		let returnString = '';
		const _orderBy = [...state.orderBy];

		// order the array by weight and reverse it
		_orderBy.sort((a, b) => a.weight - b.weight).reverse();

		_orderBy.forEach(column => {
			if (column.direction !== '') {

				let dir = '';

				// ASC hav no operator, DESC is -
				if (column.direction === 'DESC') {
					dir = '-';
				}

				returnString += `,${ dir }${ column.name }`;
			}
		});

		return returnString.slice(1);
	}
};

export default getters;