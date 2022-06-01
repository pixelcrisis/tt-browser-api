// mutate/onText.js
// handling non-user messages

module.exports = function (target) {
	let data = { target: $(target) }
	this.$emit("text", data)
}