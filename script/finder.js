// start the process
export const Find = function () {
	this.__looking = true
	this.print("Finding Turntable...")
	this.emit("load")
}

// find turntable
export const FindTT = function () {
	let lobby = $("#turntable #topBG").length
	if (lobby) return this.FindLobby()
	// don't check if already loaded
	if (this.core) return this.core
	// can't do anything without turntable
	if (!window.turntable) return this.FindFail()
	this.core = window.turntable
	this.debug("Looking For Room...")
	return true
}

// find the turntable room
export const FindRoom = function () {
	this.user = window.turntable.user
	if (!this.user) return false
	this.view = window.turntable.topViewController
	if (!this.view || !this.view.roomId) return false
	this.room = window.turntable.topViewController.roomView
	if (!this.room || !this.room.roomData) return false
	this.room = this.view.roomData
	this.debug("Found Room", this.room)
	return true
}

export const FindFail = function () {
	this.error("Turntable Not Found")
	this.__looking = false
	return false
}

export const FindLobby = function () {
	this.print("Attached To Lobby")
	this.__looking = false
	this.emit("lobby")
	return false
}