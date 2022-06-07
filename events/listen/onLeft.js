export default onLeft = event => {
	for (let user of event.user) {
		let data = {
			user: { id: user.userid, name: user.name },
			raw: event
		}

		this.debug(`[left] ${ user.name }`, data)
		this.emit("left", data)
	}
}