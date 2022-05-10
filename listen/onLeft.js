// listen/onLeft.js
// handling user leaving

module.exports = function (event) {
	for (let user of event.user) {
		this.Debug(`[left] ${ user.name }`, user)
		this.Emit("left", { user, raw: event })
	}
}