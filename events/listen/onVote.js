export default onVote = event => {
	this.recordVote(event.room.metadata)
	// get the last vote in the list
	let list = event.room.metadata.votelog
	let [ id, vote ] = list[ list.length - 1 ]
	let user = { id, name: this.getName(id) }
	let data = { vote, user, raw: event }
	this.debug(`[vote] ${ user.name } (${ vote })`, data)
	this.emit("vote", data)
}