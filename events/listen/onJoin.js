// listen/onJoin.js
// handling user join

module.exports = function (event) {
	for (let user of event.user) {
		let data = { user, raw: event }
		this.Debug(`[join] ${ user.name }`, data)
		this.Emit("join", data)
	}
}