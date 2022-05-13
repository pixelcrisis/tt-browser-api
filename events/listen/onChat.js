// listen/onChat.js
// handling tt chat events

module.exports = function (event) {
	let self = event.senderid == this.$user.id
	let text = event.text, ping = this.hasPing(text)
	let user = { userid: event.userid, name: event.name }
	let data = { user, text, ping, self, raw: event }
	this.Debug(`[chat] ${ user.name }`, data)
	this.Emit("chat", data)
}