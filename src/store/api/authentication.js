import Cookies from 'js-cookie';
import { query } from './swagger';

const DOMAIN = process.env.NODE_ENV === 'production' ? '.setlist.warths.fr' : 'localhost';


/**
 * Store a token localy for subsequent authetication without login
 * @param {String} token Token to be stored localy
 */
function setToken(token) {
	try {
		if (typeof token !== 'string') {
			throw new Error('The token need to be a string.');
		}

		Cookies.set('token', token, { domain: DOMAIN });
	}
	catch (error) {
		console.log('[authentication.js][setToken]', error);
		throw new Error(error);
	}
}

/**
 * Return any localy stored token
 */
function getToken() {
	try {
		return Cookies.get('token', { domain: DOMAIN });
	}
	catch (error) {
		console.log('[authentication.js][getToken]', error);
		throw new Error(error);
	}
}

/**
 * Log the current user out by deleting the connexion cookie.
 */
function removeToken() {
	try {
		Cookies.remove('token', { domain: DOMAIN });
	}
	catch (error) {
		console.error('[authentication.js][removeToken]', error);
		throw new Error(error);
	}
}

/**
 * Alias fo the removeToken function
 */
function logout() {
	removeToken();
}

// TODO: update to the appropriate spec for the setlist
async function getRefreshedToken() {
	const operationId = 'auth.refresh';

	try {
		const { data } = await query({ operationId }, true);

		return data.access_token ? data.access_token : null;
	}
	catch (error) {
		removeToken();

		throw new Error(
			'[authentication.js][getRefreshedToken]',
			"We can't refresh the provided token, please try to login and try again"
		);
	}
}

/**
 * Check if the token is still valide or not
 * @param {String} token JSON Web Token to be validated
 */
function isTokenExpired(token) {
	try {
		const base64Url = token.split('.')[1];
		const base64Content = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const payload = JSON.parse(atob(base64Content));

		if (payload && payload.exp > Date.now() / 1000) {
			return false;
		}

		return true;
	}
	catch (error) {
		// console.log('[authentication.js][isTokenExpired]', error);
		// throw new Error(error);

		return true;
	}
}

/**
 * log the user in
 * @param {{email: String, password: String} | {token: String}} [credentials] `email` and `password` to be used for authentication or a valide `token`. If no crendentials are provided the localy saved token will be used
 */
async function login({ email, password, token } = {}) {
	const operationId = 'auth.login';
	let _token = null;

	try {
		if (email && password) {
			const { data } = await query(operationId, { data: { email, password } });

			if (!data.access_token) {
				return false;
			}

			_token = data.access_token;
		}
		else {
			// Priority to the token in the parameters, if not provided get the token from the cookie
			_token = token ? token : getToken();

			if (_token) {
				if (isTokenExpired(_token)) {
					const refreshedToken = await getRefreshedToken();

					if (refreshedToken) {
						_token = refreshedToken;
					}
					else {
						return false;
					}
				}
			}
			else {
				throw new Error(
					'The login function require an email and password or a token.'
				);
			}
		}

		setToken(_token);

		return true;
	}
	catch (error) {
		console.log('[authentication.js][login]', error);
		throw new Error(error);
	}
}

export {
	login,
	logout,
	removeToken,
	getToken,
	isTokenExpired,
	getRefreshedToken
};
