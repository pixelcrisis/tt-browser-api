export default onSnag = event => {
	this.RecordSnag()
	
	let user = event.userid
	let data = {
		self: user == this.user.id,
		user: { id: user, name: this.getName(user) },
		raw: event
	}

	this.debug(`[snag] ${ name }`, data)
	this.emit("snag", data)
}