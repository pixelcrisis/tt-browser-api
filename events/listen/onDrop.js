export default onDrop = event => {
	for (let user of event.user) {
		let data = {
			self: user.userid == this.user.id,
			stat: this.RecordDrop(user.userid),
			user: { id: user.userid, name: user.name },
			raw: event
		}

		this.debug(`[drop] ${ user.name }`, data)
		this.emit("drop", data)
	}
}