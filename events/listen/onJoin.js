export default onJoin = event => {
	for (let user of event.user) {
		let data = {
			user: { id: user.userid, name: user.name },
			raw: event
		}

		this.debug(`[join] ${ user.name }`, data)
		this.emit("join", data)
	}
}