// listen.js
// intercepting tt events

module.exports = TBA => {

	TBA.prototype.Listen = function (event) {
		let type = event.command
		if (!event.command) return // only commands
		// custom handlers for most common events
		if (type == "speak") 		return this._onChat(event)
		if (type == "pmmed") 		return this._onMail(event)
		if (type == "add_dj") 	return this._onJump(event)
		if (type == "rem_dj") 	return this._onDrop(event)
		if (type == "nosong") 	return this._onSong(event)
		if (type == "newsong") 	return this._onSong(event)
		if (type == "snagged") 	return this._onSnag(event)
		if (type == "update_votes") return this._onVote(event)
		if (type == "deregistered") return this._onLeft(event)
		if (type == "registered") 	return this._onJoin(event)
		// otherwise, just emit the raw turntable data
		this.Debug(`Unhandled: ${ type }`, event)
		return this.Emit(name, { raw: event })
	}

	TBA.prototype._onChat = require("../listen/onChat.js")
	TBA.prototype._onMail = require("../listen/onMail.js")
	TBA.prototype._onJump = require("../listen/onJump.js")
	TBA.prototype._onDrop = require("../listen/onDrop.js")
	TBA.prototype._onSong = require("../listen/onSong.js")
	TBA.prototype._onSnag = require("../listen/onSnag.js")
	TBA.prototype._onVote = require("../listen/onVote.js")
	TBA.prototype._onJoin = require("../listen/onJoin.js")
	TBA.prototype._onLeft = require("../listen/onLeft.js")

}