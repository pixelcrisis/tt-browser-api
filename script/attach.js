// attach.js
// initialize with turntable

module.exports = TBA => {

	TBA.prototype.Attach = function () {
		// make sure that tt exists
		if (!this._loadCore()) return false
		// find the room if tt exists
		if (!this._loadRoom()) return this._reattach()
		// we've attached to the room!
		// bind access to turntable
		let [ named, count ] = this._attached()
		this.Print(`Attached to ${ named } (${ count } Users)`)
		this.Emit("attach", this.$room)
	}

	TBA.prototype._attached = function () {
		// bind our listener to turntable
		this.$bind = this.Listen.bind(this)
		this.$core.addEventListener("message", this.$bind)
		// return the room name and listeners
		let named = this.$room.name
		let count = this.$view.numListeners()
		return [ named, count ]
	}

	TBA.prototype._reattach = function () {
		// try again until it works!
		let again = this.Attach.bind(this)
		return setTimeout(again, 200)
	}

	TBA.prototype._initLoad = function () {
		// we've officially started
		// who knows how long it'll take?
		this.Debug("Finding Turntable...")
		this.loading = true
	}

	TBA.prototype._loadCore = function () {
		// don't check if we already have
		if (this.$core) return this.$core
		if (!this.loading) this._initLoad()
		// if turntable doesn't exist, what do?
		if (!window.turntable) return this._loadFail()
		// we can only do like....3 things in the lobby
		if ($( LOBBY ).length) return this._loadLobby()
		// but hey, now we can find our room
		this.Debug("Looking For Room...")
		this.$core = window.turntable
		return this.$core
	}

	TBA.prototype._loadRoom = function () {
		// just make sure everything we need
		// has been loaded into the DOM first
		this.$user = window.turntable.user
		if (!this.$user) return false
		this.$view = window.turntable.topViewController
		if (!this.$view || !this.$view.roomId) return false
		const room = window.turntable.topViewController.roomView
		if (!room || !room.roomData) return false
		else this.Debug("Found Room", room.roomData)
		this.$room = window.turntable.topViewController.roomData
		return this.$room
	}

	TBA.prototype._loadFail = function () {
		this.Error("Turntable Not Found")
		this.loading = false
		return false
	}

	TBA.prototype._loadLobby = function () {
		this.Print("Attached To Lobby")
		this.loading = false
		this.Emit("lobby")
		return false
	}

}

// the lobby defining selector
const LOBBY = "#turntable #topBG"