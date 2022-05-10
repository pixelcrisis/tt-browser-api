// bridge.js
// communicating with turntable

module.exports = TBA => {
	
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

}