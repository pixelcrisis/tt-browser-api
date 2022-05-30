// listen/onChat.js
// handling tt chat events

module.exports = function (event) {
	let data = { 
		text: event.text,
		ping: this.$hasPing(event.text),
		self: event.senderid == this.$user.id,
		user: { id: event.userid, name: event.name }, 
		target: this.$getChat(event.text, event.name), 
		raw: event 
	}
	
	this.$debug(`[chat] ${ user.name }`, data)
	this.$emit("chat", data)
}