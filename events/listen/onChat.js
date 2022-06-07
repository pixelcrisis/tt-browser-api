export default onChat = event => {
	let data = {
		text: event.text,
		ping: this.hasPing(event.text),
		self: event.userid == this.user.id,
		user: { id: event.userid, name: event.name },
		target: this.getChat(event.text, event.name),
		raw: event
	}

	this.debug(`[chat] ${ event.name }`, data)
	this.emit("chat", data)
}