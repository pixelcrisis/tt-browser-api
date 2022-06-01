// listen/onSong.js
// handling songs (or not) starting

module.exports = function (event) {
	
	this.__cacheSong(event.room.metadata)

	let data = {
		curr: this.$now_playing, 
		last: this.$last_played,
		self: this.$now_playing.djid == this.$user().id,
		name: this.$now_playing.song || "Nothing",
		artist: this.$now_playing.artist || "No One",
		raw: event
	}

	this.$debug(`[song] ${ data.name }`, data)
	this.$emit("song", data)
	
}