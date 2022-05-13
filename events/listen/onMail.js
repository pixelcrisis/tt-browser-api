// listen/onMail.js
// handling tt PM events

module.exports = function (event) {
	let text = event.text
	let name = this.getName(event.senderid)
	let user = { userid: event.senderid, name }
	let data = { user, text, raw: event }
	this.Debug(`[mail] ${ name }`, data)
	this.Emit("mail", data)
}