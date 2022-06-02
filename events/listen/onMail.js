// listen/onMail.js
// handling tt PM events

module.exports = function (event) {
	let user = event.senderid
	let data = {
		text: event.text,
		user: { id: user, name: this.$getName(user) },
		raw: event
	}

	this.$debug(`[mail] ${ name }`, data)
	this.$emit("mail", data)
}