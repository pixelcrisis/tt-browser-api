// listen.js
// intercepting tt events

module.exports = TBA => {

	TBA.prototype.__listen = function (event) {
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
	}

	TBA.prototype.$on("attach", function () {
		// bind our listener
		this.__listener = this.__listen.bind(this)
		window.turntable.addEventListener("message", this.__listener)
	})

	TBA.prototype.__onChat = require("./listen/onChat.js")
	TBA.prototype.__onMail = require("./listen/onMail.js")
	TBA.prototype.__onJump = require("./listen/onJump.js")
	TBA.prototype.__onDrop = require("./listen/onDrop.js")
	TBA.prototype.__onSong = require("./listen/onSong.js")
	TBA.prototype.__onSnag = require("./listen/onSnag.js")
	TBA.prototype.__onVote = require("./listen/onVote.js")
	TBA.prototype.__onJoin = require("./listen/onJoin.js")
	TBA.prototype.__onLeft = require("./listen/onLeft.js")

}