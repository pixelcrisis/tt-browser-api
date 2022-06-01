// listen/onJump.js
// handling a new room DJ

module.exports = function (event) {
	
	for (let user of event.user) {
		let data = { 
			self: user.userid == this.$user().id,
			stat: this.__cacheJump(user.userid),
			user: { id: user.userid, name: user.name }, 
			raw: event
		}

		this.$debug(`[jump] ${ user.name }`, data)
		this.$emit("jump", data)
	}
	
}