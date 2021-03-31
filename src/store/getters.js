import { getField } from 'vuex-map-fields';
import { getDiffKeys, compareKeys } from '@/helpers/methods';
import { getDefaultState } from './state';
import { getUrlPrameters } from '@/helpers/methods';


const getters = {
	getPage: state => state.page,
	getOrderByAsText: state => {
		let returnString = '';
		const _orderBy = [...state.percist.orderBy];

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
		if (returnString.length > 0) {
			return returnString.slice(1);
		}
		else {
			return '';
		}

	},
	getOrderBy: state => state.percist.orderBy,
	getSeed: state => state.orderByRandomSeed,
	getOrderByOrSeed: (_, otherGetters) => (otherGetters.getOrderByAsText === '' ? { seed: otherGetters.getSeed } : { orderby: otherGetters.getOrderByAsText }),

	getSearchParams: state => {
		const nonDefaultParams = getDiffKeys(state.searchSettings, getDefaultState().searchSettings);
		const searchParams = {};

		const arrangements = [];

		nonDefaultParams.forEach(param => {

			switch (param) {
				case 'cdlc':
					searchParams['odlc'] = false;
					break;

				case 'odlc':
					searchParams['odlc'] = true;
					break;

				case 'arrangements':
					Object.entries(state.searchSettings.arrangements).forEach(arrangement => {
						if (arrangement[1]) {
							arrangements.push(arrangement[0]);
						}
					});
					searchParams['arrangements'] = arrangements;
					break;

				default:
					searchParams[param] = state.searchSettings[param];
					break;
			}
		});

		return searchParams;

	},
	isSearch: state => !compareKeys(getDefaultState().searchSettings, state.searchSettings),
	isLastPage: state => state.isLastPage,
	isLastRuleVersionAccepted: state => state.percist.lastAcceptedRuleVersion >= process.env.VUE_APP_RULES_VERSION,
	isForceShowRulesUp: () => Object.prototype.hasOwnProperty.call(getUrlPrameters(), 'showRules'),

	getField
};

export default getters;