// listen/onDrop.js
// handling a DJ leaving the deck

module.exports = function (event) {
	for (let user of event.user) {
		let stat = this.cacheDrop(user.userid)
		let data = { user, stat, raw: event }
		this.Debug(`[drop] ${ user.name }`, data)
		this.Emit("drop", data)
	}
}