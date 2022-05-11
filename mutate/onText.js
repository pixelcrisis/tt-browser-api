// mutate/onText.js
// handling non-user messages

module.exports = function (elem) {
	let data = { elem }
	this.Emit("text", data)
}