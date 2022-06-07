export default onMail = event => {
	let user = event.senderid
	let name = this.getName(user)
	let data = {
		text: event.text,
		user: { id: user, name },
		raw: event
	}

	this.debug(`[mail] ${ name }`, data)
	this.emit("mail", data)
}