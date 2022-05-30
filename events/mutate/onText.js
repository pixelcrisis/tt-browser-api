// mutate/onText.js
// handling non-user messages

module.exports = function (target) {
	let data = { target, user: target.has(".avatar").length }
	this.$emit("text", data)
}