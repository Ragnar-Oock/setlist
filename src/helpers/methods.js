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
function prettyLog(module, tag, message, styles) {
	styles = { ...{ module:'background: #583A94; color:#fff; border-radius:3px 0 0 3px',
		tag: 'background: lightblue; color:#404040; border-radius:0 3px 3px 0',
		message: 'background: none' }, ...styles };
	console.log(`%c ${ module } %c ${ tag } %c   ${ message }`, styles.module, styles.tag, styles.message);
}

export default prettyLog;