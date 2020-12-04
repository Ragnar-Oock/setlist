/**
 * Log a message prefixed with a colored module and tag
 * @param {String} module module issuing a log
 * @param {String} tag cutom tag
 * @param {String} message message to be logged
 * @param {Object} styles overwrite the style for any of the 3 parts
 * @param {String} styles.module style for the module name
 * @param {String} styles.tag style for the tag
 * @param {String} styles.message style for the message
 */
export function prettyLog(module, tag, message, styles) {
	if (process.env.VUE_APP_SHOW_LOG) {
		styles = { ...{ module:'background: #583A94; color:#fff; border-radius:3px 0 0 3px',
			tag: 'background: lightblue; color:#404040; border-radius:0 3px 3px 0',
			message: 'background: none' }, ...styles };
		console.log(`%c ${ module } %c ${ tag } %c   ${ message }`, styles.module, styles.tag, styles.message);
	}
}

export function compareKeys(requiredKeys, providedKeys) {
	try {
		let keysAreIdenticals = false;
		const _requiredKeys = Object.entries(requiredKeys);

		_requiredKeys.some(entry => {
			const key = entry[0];

			if (typeof providedKeys[key] === 'object') {
				keysAreIdenticals = compareKeys(providedKeys[key], requiredKeys[key]);
			}
			else {
				keysAreIdenticals = (providedKeys[key] === requiredKeys[key]);
			}

			return !keysAreIdenticals;
		});

		return keysAreIdenticals;
	}
	catch (error) {
		prettyLog('setlist', 'helpers', error);
		throw new Error(error);
	}
}

export function getDiffKeys(requiredKeys, providedKeys) {
	try {
		const diffKeys = [];
		const _requiredKeys = Object.entries(requiredKeys);

		_requiredKeys.forEach(entry => {
			let areKeysDifferent = false;
			const key = entry[0];

			if (typeof providedKeys[key] === 'object') {
				areKeysDifferent = !compareKeys(providedKeys[key], requiredKeys[key]);
			}
			else {
				areKeysDifferent = (providedKeys[key] !== requiredKeys[key]);
			}

			if (areKeysDifferent) {
				diffKeys.push(key);
			}
		});

		return diffKeys;
	}
	catch (error) {
		prettyLog('setlist', 'helpers', error);
		throw new Error(error);
	}
}

