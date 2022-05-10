// attach.js
// initialize with turntable

module.exports = TBA => {

	TBA.prototype.Attach = function () {
		let core = window.turntable
		if (!core) return this.Error("No Room Found")
		// only emit a half attach in the lobby
		this.isLobby = $("#turntable #topBG").length
		if (this.isLobby) return this.Emit("lobby")
		// we may have to wait for TT to load
		let again = TBA.prototype.Attach.bind(this)
		let delay = () => setTimeout(again, 500)
		// make sure we have all the data first
		let user = window.turntable.user
		if (!user) return delay()
		let room = FIND_KEY(core, "roomId")
		if (!room) return delay()
		let data = FIND_KEY(room, "roomData")
		if (!data) return delay()
		// once it's loaded, bind it all up
		this.listener = this.Listen.bind(this)
		core.addEventListener("message", this.listener)
		this.Debug("Attached To Room", room)
		// add access points to turntable
		this.$main = window.turntable
		this.$user = window.turntable.user
		this.$view = window.turntable.topViewController
		this.$room = window.turntable.topViewController.roomData
		// fire our initial events
		let name = room.roomData.name
		let list = room.numListeners()
		this.Print(`Attached to ${ name }: ${ list } Users.`)
		this.Emit("attach", room)
	}

}

// find nested props in an object
const FIND_KEY = function (obj, key) {
	for (let prop in obj) {
		if (obj[prop] && obj[prop][key]) {
			return obj[prop]
		}
	}
}