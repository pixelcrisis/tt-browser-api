// mutate/onUser.js
// detecting a user profile

module.exports = function (userid) {
	let data = { userid }
	this.Emit("user", data)
}