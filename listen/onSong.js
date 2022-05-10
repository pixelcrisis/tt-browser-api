// listen/onSong.js
// handling songs (or not) starting

module.exports = function (event) {
	this.cacheSong(event.room.metadata.current_song)
	let song = this.now_playing
	let last = this.last_played
	let data = { song, last, raw: event }
	this.Debug(`[song] ${ song.song || "None" }`, data)
	this.Emit("song", data)
}