// listen.js
// intercepting tt events

module.exports = {

	// import our listeners
	__onChat: require("./listen/onChat.js"),
	__onMail: require("./listen/onMail.js"),
	__onJump: require("./listen/onJump.js"),
	__onDrop: require("./listen/onDrop.js"),
	__onSong: require("./listen/onSong.js"),
	__onSnag: require("./listen/onSnag.js"),
	__onVote: require("./listen/onVote.js"),
	__onJoin: require("./listen/onJoin.js"),
	__onLeft: require("./listen/onLeft.js"),

	__listen (event) {
		let type = event.command
		if (!event.command) return // only commands
		// custom handlers for most common events
		if (type == "speak") 		return this.__onChat(event)
		if (type == "pmmed") 		return this.__onMail(event)
		if (type == "add_dj") 	return this.__onJump(event)
		if (type == "rem_dj") 	return this.__onDrop(event)
		if (type == "nosong") 	return this.__onSong(event)
		if (type == "newsong") 	return this.__onSong(event)
		if (type == "snagged") 	return this.__onSnag(event)
		if (type == "update_votes") return this.__onVote(event)
		if (type == "deregistered") return this.__onLeft(event)
		if (type == "registered") 	return this.__onJoin(event)
		// otherwise, just emit the raw turntable data
		this.$debug(`Unhandled: ${ type }`, event)
		return this.$emit(name, { raw: event })
	},

	__bindListener () {
		this.__listener = this.__listen.bind(this)
		window.turntable.addEventListener("message", this.__listener)
	}

}