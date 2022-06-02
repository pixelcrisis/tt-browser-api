// cached.js
// storing extra data and stats

module.exports = {

	$now_playing: {},
	$last_played: {},
	$current_djs: {},

	__cacheSong (room) {
		this.$last_played = { ...this.$now_playing }
		let song = room.current_song
		let last = this.$last_played

		if (!song) this.$now_playing = { none: true }
		else this.$now_playing = { 
			...song.metadata, djid: song.djid, snag: 0,
			love: room.upvotes, hate: room.downvotes
		}

		if (last.song && last.djid) {
			let dj = this.$current_djs[last.djid]
			if (dj && last.love) dj.love += last.love
			if (dj && last.hate) dj.hate += last.hate
			if (dj && last.snag) dj.snag += last.snag
			if (dj) dj.spun += 1
		}
	},

	__cacheRoom (room) {
		for (let id of room.djs) this.__cacheJump(id)
		this.__cacheSong(room)
	},

	__cacheJump (id) {
		let stat = this.$current_djs[id]
		let base = { spun: 0, love: 0, hate: 0, snag: 0 }
		this.$current_djs[id] = stat || base
		return this.$current_djs[id]
	},

	__cacheDrop (id) {
		let curr = this.$current_djs[id]
		let stat = curr ? { ...curr } : false
		if (stat) delete this.$current_djs[id]
		return stat
	},

	__cacheVote (room) {
		this.$now_playing.love = room.upvotes
		this.$now_playing.hate = room.downvotes
	},

	__cacheSnag () {
		this.$now_playing.snag += 1
	}
	
}