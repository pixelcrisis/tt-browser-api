// listen/onChat.js
// handling tt chat events

module.exports = function (event) {
	let self = event.senderid == this.$user.id
	let elem = this.getChat(event.text, event.name)
	let text = event.text, ping = this.hasPing(text)
	let user = { userid: event.userid, name: event.name }
	let data = { user, text, ping, self, elem, raw: event }
	this.Debug(`[chat] ${ user.name }`, data)
	this.Emit("chat", data)
}