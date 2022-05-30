// mutate/onUser.js
// detecting a user profile

module.exports = function (userid) {
	let data = {
		user: { id: userid, name: this.$getName(userid) }
	}
	this.$emit("user", data)
}