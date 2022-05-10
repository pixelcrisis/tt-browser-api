// listen/onPmmed.js
// handling tt PM events

module.exports = function (event) {
	let name = this.getName(event.senderid)
	this.Debug(`pmmed: ${ name }`, event)
}