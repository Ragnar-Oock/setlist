import yaml from 'js-yaml';
import axios from 'axios';
import { compareKeys } from '@/helpers/methods';
import {
	isTokenExpired,
	getRefreshedToken,
	getToken
} from './authentication';

async function getSwagger(url = process.env.VUE_APP_SWAGGER_PATH) {
	try {
		const { data } = await axios.get(url);

		return data;
	}
	catch (error) {
		console.log('[cloudaccounting.js][getSwagger]', error);
		throw new Error(error);
	}
}

function parseSwagger (yamlDoc) {
	try {
		const obj = yaml.safeLoad(yamlDoc);
		let API = {};

		API.BASE_URL = obj.servers[0].url;

		for (const [endpoint, path] of Object.entries(obj.paths)) {
			for (const [method, config] of Object.entries(path)) {
				const { operationId, parameters, security } = config;
				const params = [];
				const data = [];

				if (parameters) {
					parameters.forEach(parameter => {
						if (parameter.required) {
							if (parameter.in === 'path') {
								params.push(parameter.name);
							}
							else {
								data.push(parameter.name);
							}
						}
					});
				}

				API = {
					...API,
					[operationId]: {
						url: `${ endpoint }/`,
						method,
						params,
						data,
						security: security && security.length > 0
					}
				};
			}
		}

		return API;
	}
	catch (error) {
		console.log('[cloudaccounting.js][parseSwagger]', error);
		throw new Error(error);
	}
}

// /**
//  * Perform a request to the provided endpoint
//  * @param {String} operationId id of the API endpoint to be interogated
//  * @param {Object} payload parameters and data to send with the request
//  * @param {Object} payload.params assossiative array of path parameters to be consumed by the endpoint
//  * @param {Object} payload.data assossiative array of data to be consumed by the endpoint
//  * @param {Boolean} forceAuthorizationHeaders Should the default authorization header be overwriten
//  */
async function query(
	{ operationId, params = {}, data = {} },
	forceAuthorizationHeaders = false
) {
	try {
		if (typeof operationId === 'undefined') {
			throw new Error('The query function require an operationId');
		}

		const swagger = await getSwagger();
		const API = query.api || (query.api = parseSwagger(swagger));
		const endpoint = API[operationId];
		const { url, method } = endpoint;
		let token = getToken();



		if (!endpoint) {
			throw new Error(
				`The endpoint for the operationId ${ operationId } doesn't exist on the API.`
			);
		}
		else {
			if (
				endpoint.params.length > 0 &&
				compareKeys(endpoint.params, params) === false
			) {
				throw new Error(
					`The endpoint for the operationId ${ operationId } require the following params to work correctly : ${ endpoint.params.toString() }.`
				);
			}

			if (
				endpoint.data.length > 0 &&
				compareKeys(endpoint.data, data) === false
			) {
				throw new Error(
					`The endpoint for the operationId ${ operationId } require the following data to work correctly : ${ endpoint.data.toString() }.`
				);
			}

			if (endpoint.security && !token) {
				throw new Error(
					`The endpoint for the operationId ${ operationId } require a token`
				);
			}
		}

		let urlWithParams = url;

		for (const [key, value] of Object.entries(params)) {
			urlWithParams = urlWithParams.replace(`{${ key }}`, value);
		}

		if (endpoint.security && token) {
			if (isTokenExpired(token)) {
				const refreshedToken = await getRefreshedToken();

				if (refreshedToken) {
					token = refreshedToken;
				}
			}
		}

		const response = await axios({
			method,
			url: `${ API.BASE_URL }${ urlWithParams }`,
			params,
			data,
			headers:
				(endpoint.security && token) || forceAuthorizationHeaders
					? { Authorization: `Bearer ${ token }` }
					: {}
		});

		return response;
	}
	catch (error) {
		console.log('[cloudaccounting.js][query]', error);
		throw new Error(error);
	}
}

export { query };
