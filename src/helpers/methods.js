function compareKeys(requiredKeys, providedKeys) {
	try {
		const _providedKeys = Array.isArray(providedKeys)
			? providedKeys
			: Object.keys(providedKeys);

		let requiredKeysExist;

		for (const requiredKey of requiredKeys) {
			requiredKeysExist = null;

			for (const providedKey of _providedKeys) {
				if (requiredKey === providedKey) {
					requiredKeysExist = true;
					break;
				}
				else {
					requiredKeysExist = false;
				}
			}

			if (!requiredKeysExist) {
				break;
			}
		}

		return requiredKeysExist;
	}
	catch (error) {
		console.log('[methods.js][compareKeys]', error);
		throw new Error(error);
	}
}

export { compareKeys };
