export let now_playing = {}
export let last_played = {}
export let current_djs = {}

// record djs and song on attach
export const RecordRoom = function (room) {
	for (let id of room.djs) this.RecordJump(id)
	this.RecordSong(room)
}

// record new songs (or no song)
export const RecordSong = function (room) {
	let song = room.curent_song
	let last = { ...this.now_playing }
	this.last_played = last
	
	if (!song) this.now_playing = { none: true }
	else this.now_playing = {
		...song.metadata, djid: song.djid, snag: 0,
		yay: room.upvotes, meh: room.downvotes
	}

	if (last.song && last.djid) {
		let dj = this.current_djs[last.djid]
		if (dj && last.yay) dj.yay += last.yay
		if (dj && last.meh) dj.meh += last.meh
		if (dj && last.snag) dj.snag += last.snag
		if (dj) dj.spun += 1
	}

	return { 
		curr: this.now_playing, 
		last: this.last_played 
	}
}

// record djs jumping on deck
export const RecordJump = function (id) {
	let stat = this.current_djs[id]
	let base = { yay: 0, meh: 0, snag: 0, spun: 0 }
	this.current_djs[id] = stat || base
	return this.current_djs[id]
}

// record djs dropping off deck
export const RecordDrop = function (id) {
	let curr = this.current_djs[id]
	let stat = curr ? { ...curr } : false
	if (stat) delete this.current_djs[id]
	return stat
}

// recording upvote/downvote changes
export const RecordVote = function (room) {
	this.now_playing.yay = room.upvotes
	this.last_played.meh = room.downvotes
}

// recording new snags
export const RecordSnag = function () {
	this.now_playing.snag += 1
}