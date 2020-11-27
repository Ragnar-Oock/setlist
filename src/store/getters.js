const getters = {
	getPage: state => state.page,
	isDarkModeOn: state => state.percist.darkMode,
	getOrderBy: state => {
		let returnString = '';
		const _orderBy = [...state.orderBy];

		// order the array by weight and reverse it
		_orderBy.sort((a, b) => a.weight - b.weight).reverse();

		_orderBy.forEach(column => {
			if (column.direction !== '') {

				let dir = '';

				if (column.direction === 'ASC') {
					dir = '+';
				}
				else if (column.direction === 'DESC') {
					dir = '-';
				}

				returnString += `,${ dir }${ column.name }`;
			}
		});

		return returnString.slice(1);
	}
};

export default getters;