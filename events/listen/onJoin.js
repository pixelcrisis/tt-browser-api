// listen/onJoin.js
// handling user join

module.exports = function (event) {

	for (let user of event.user) {
		let data = {
			user: { id: user.userid, name: user.name },
			raw: event
		}

		this.$debut(`[join] ${ user.name }`, data)
		this.$emit("join", data)
	}

}