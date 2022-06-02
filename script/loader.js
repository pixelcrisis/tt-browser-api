// loader.js
// waiting for turntable

module.exports = {

	__loadInit () {
		// we've officially started
		// who knows how long it'll take?
		this.$print("Finding Turntable...")
		this.loading = true
		this.$emit("load")
	},

	__loadCore () {
		if (!this.loading) this.__loadInit()
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
	},

	__loadRoom () {
		// just make sure everything we need
		// has been loaded into the DOM first
		if (!this.$user()) return false
		if (!this.$view() || !this.$view().roomId) return false
		const room = window.turntable.topViewController.roomView
		if (!room || !room.roomData) return false
		else this.$debug("Found Room", room.roomData)
		return this.$room()
	},

	__loadFail () {
		this.$error("Turntable Not Found")
		this.loading = false
		return false
	},

	__loadLobby () {
		this.$print("Attached To Lobby")
		this.loading = false
		this.$emit("lobby")
		return false
	}

}

// the lobby defining selector
const LOBBY = "#turntable #topBG"