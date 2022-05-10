// listen/onSnagged.js
// handling someone snagging the song

module.exports = function (event) {
	this.cacheSnag()
	let name = this.getName(event.userid)
	let user = { userid: event.userid, name }
	let data = { user, raw: event }
	this.Debug(`[snag] ${ name }`, data)
	this.Emit("snag", data)
}