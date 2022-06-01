// cached.js
// storing extra data and stats

module.exports = TBA => {

	TBA.prototype.__cacheInit = function (room) {
		for (let id of room.djs) this.__cacheJump(id)
		this.__cacheSong(room)
	}

	TBA.prototype.__cacheJump = function (id) {
		let stat = this.$current_djs[id]
		let base = { spun: 0, love: 0, hate: 0, snag: 0 }
		this.$current_djs[id] = stat || base
		return this.$current_djs[id]
	}

	TBA.prototype.__cacheDrop = function (id) {
		let curr = this.$current_djs[id]
		let stat = curr ? { ...curr } : false
		if (stat) delete this.$current_djs[id]
		return stat
	}

	TBA.prototype.__cacheSong = function (room) {
		this.$last_played = { ...this.$now_playing }
		let song = room.current_song
		let last = this.$last_played

		if (!song) this.$now_playing = { none: true }
		else this.$now_playing = {
			...song.metadata,
			djid: song.djid, snag: 0,
			love: room.upvotes,
			hate: room.downvotes
		}

		if (last.song && last.djid) {
			let dj = this.$current_djs[last.djid]
			if (dj && last.love) dj.love += last.love
			if (dj && last.hate) dj.hate += last.hate
			if (dj && last.snag) dj.snag += last.snag
		}
	}

	TBA.prototype.__cacheVote = function (room) {
		this.$now_playing.love = room.upvotes
		this.$now_playing.hate = room.downvotes
	}

	TBA.prototype.__cacheSnag = function () {
		this.$now_playing.snag += 1
	}

	TBA.prototype.$current_djs = {}
	TBA.prototype.$now_playing = {}
	TBA.prototype.$last_played = {}

}