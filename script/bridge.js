// bridge.js
// communicating with turntable

module.exports = TBA => {

	TBA.prototype.Jump = () => window.turntable.topViewController.becomeDj()
	TBA.prototype.Drop = () => window.turntable.topViewController.quitDj()
	
	TBA.prototype.getName = function (id) {
		id = id || "Unknown"
		// check the room locally first
		let User = this.$view.userMap[id]
		if (User) return User.attributes.name
		// maybe they're hiding in the DMs
		let Chat = this.$core.buddyList.pmWindows
		if (Chat && Chat[id]) User = Chat[id].otherUser
		if (User) return User.attributes.name
		// we'll check the API for a name otherwise later
		// when I feel like figuring out async (todo)
		return id
	}

	TBA.prototype.hasPing = function (str) {
		// just checks a string for an us ping
		let list = str.split(" ") // per word
		let ping = `@${ this.$user.attributes.name }`
		return list.indexOf(ping) > -1
	}

}