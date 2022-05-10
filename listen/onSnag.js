// listen/onSnagged.js
// handling someone snagging the song

module.exports = function (event) {
	let name = this.getName(event.userid)
	this.Debug(`snag: ${ name }`, event)
}