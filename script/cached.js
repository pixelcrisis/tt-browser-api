// cached.js
// storing extra data and stats

module.exports = TBA => {

	TBA.prototype.cacheInit = function () {
		// define our storage
		this.now_playing = {}
		this.last_played = {}
		this.current_djs = {}
		// cache the current data
		let list = this.$room.metadata.djs
		let song = this.$room.metadata.current_song
		for (let id of list) this.cacheJump(id)
		this.cacheSong(song)
		// finished initial cache
		let name = song && song.metadata ? song.metadata.song : "None"
		this.Debug(`Cached Song: ${ name }`)
		this.Debug(`Cached DJs: ${ list.length }`)
	}

	TBA.prototype.cacheJump = function (id) {
		// add stats to a new DJ
		let stat = this.current_djs[id]
		let base = { spun: 0, love: 0, hate: 0, snag: 0 }
		this.current_djs[id] = stat || base
	}

	TBA.prototype.cacheDrop = function (id) {
		// remove from cache, return stats
		if (!this.current_djs[id]) return false
		let stat = { ...this.current_djs[id] }
		delete this.current_djs[id]
		return stat
	}

	TBA.prototype.cacheSpun = function () {
		let last = this.last_played
		if (!last.song || !last.djid) return
		// add the stats from last to current DJ
		let curr = this.current_djs[last.djid]
		if (last.love) curr.love += last.love
		if (last.hate) curr.hate += last.hate
		if (last.snag) curr.snag += last.snag
		this.current_djs[last.djid] = curr
		this.current_djs[last.djid].spun += 1
	}

	TBA.prototype.cacheSong = function (song) {
		let djid = song ? song.djid : false
		let love = this.$room.metadata.upvotes
		let hate = this.$room.metadata.downvotes
		let base = { djid, love, hate, snag: 0 }
		// define our last played and current song (if any)
		this.last_played = { ...this.now_playing }
		this.now_playing = song ? { ...song.metadata, ...base } : {}
		this.cacheSpun() // update the stats of the last DJ
	}

	TBA.prototype.cacheSnag = function () {
		// increment the number of snags
		this.now_playing.snag += 1 // all we can do lol
	}

	TBA.prototype.cacheVote = function () {
		// update our cache with new values
		this.now_playing.love = this.$room.metadata.upvotes
		this.now_playing.hate = this.$room.metadata.downvotes
	}

}