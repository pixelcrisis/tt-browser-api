// attach.js
// initialize with turntable

module.exports = TBA => {

	TBA.prototype.$attach = function () {
		// make sure that tt exists
		if (!this.__loadCore()) return false
		// find the room if tt exists
		if (!this.__loadRoom()) return this.__reattach()
		// we've found the room! let's cache it
		this.__cacheInit(this.$room().metadata)
		// bind access to turntable
		let [ named, count ] = this.__attached()
		this.$print(`Attached to ${ named } (${ count } Users)`)
		this.$emit("attach", { room: this.$room() })
	}

	TBA.prototype.$detach = function () {
		// un bind and remove
		this.$debug(`Detaching...`)
		clearInterval(this.loop)
		this.__watcher.disconnect()
		this.$core.removeEventListener("message", this.__listener)
		this.$print(`Detached`)
	}

	TBA.prototype.__attached = function () {
		// return the room name and listeners
		let named = this.$room().name
		let count = this.$view().numListeners()
		return [ named, count ]
	}

	TBA.prototype.__reattach = function () {
		// try again until it works!
		let again = this.$attach.bind(this)
		return setTimeout(again, 200)
	}

	TBA.prototype.__initLoad = function () {
		// we've officially started
		// who knows how long it'll take?
		this.$print("Finding Turntable...")
		this.loading = true
		this.$emit("load")
	}

	TBA.prototype.__loadCore = function () {
		if (!this.loading) this.__initLoad()
		// we can only do like....3 things in the lobby
		if ($( LOBBY ).length) return this.__loadLobby()
		// don't check if we already have
		if (this.$core) return this.$core
		// if turntable doesn't exist, what do?
		if (!window.turntable) return this.__loadFail()
		// but hey, now we can find our room
		this.$debug("Looking For Room...")
		this.$core = window.turntable
		return this.$core
	}

	TBA.prototype.__loadRoom = function () {
		// just make sure everything we need
		// has been loaded into the DOM first
		if (!this.$user()) return false
		if (!this.$view() || !this.$view().roomId) return false
		const room = window.turntable.topViewController.roomView
		if (!room || !room.roomData) return false
		else this.$debug("Found Room", room.roomData)
		return this.$room()
	}

	TBA.prototype.__loadFail = function () {
		this.$error("Turntable Not Found")
		this.loading = false
		return false
	}

	TBA.prototype.__loadLobby = function () {
		this.$print("Attached To Lobby")
		this.loading = false
		this.$emit("lobby")
		return false
	}

}

// the lobby defining selector
const LOBBY = "#turntable #topBG"