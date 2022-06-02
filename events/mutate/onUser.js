// mutate/onUser.js
// detecting a user profile

module.exports = function (userid) {
	let name = this.$getName(userid)
	let data = { user: { id: userid, name } }
	this.$emit("user", data)
}