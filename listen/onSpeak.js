// listen/onSpeak.js
// handling tt chat events

module.exports = function (event) {
	let name = this.getName(event.userid)
	this.Debug(`speak: ${ name }`, event)
}