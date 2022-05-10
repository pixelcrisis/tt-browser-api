// listen/onJump.js
// handling a new room DJ

module.exports = function (event) {
	for (let user of event.user) {
		let data = { user, raw: event }
		this.Debug(`[jump] ${ user.name }`, data)
		this.cacheJump(user.userid)
		this.Emit("jump", data)
	}
}