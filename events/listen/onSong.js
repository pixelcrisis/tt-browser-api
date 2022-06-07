export default onSong = event => {
	let room = event.room.metadata
	let { curr, last } = this.RecordSong(room)

	let data = {
		none: curr.none,
		name: curr.song || "Nothing",
		artist: curr.artist || "No One",
		self: curr.djid == this.user.id,
		curr, last,
		raw: event
	}

	this.debug(`[song] ${ data.name }`, data)
	this.emit("song", data)
}