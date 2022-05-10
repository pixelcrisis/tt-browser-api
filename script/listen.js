// listen.js
// intercepting tt events

module.exports = TBA => {

	TBA.prototype.Listen = function (event) {
		let type = event.command
		if (!event.command) return // only commands
		this.Debug(`Received: ${ type }`, event)
		// custom handlers for most common events
		if (type == "speak") 		return this._onSpeak(event)
		if (type == "pmmed") 		return this._onPmmed(event)
		if (type == "add_dj") 	return this._onAddDJ(event)
		if (type == "rem_dj") 	return this._onRemDJ(event)
		if (type == "nosong") 	return this._onSong(event)
		if (type == "newsong") 	return this._onSong(event)
		if (type == "snagged") 	return this._onSnag(event)
		if (type == "update_votes") return this._onVote(event)
		if (type == "deregistered") return this._onLeft(event)
		if (type == "registered") 	return this._onJoin(event)
		// otherwise, just emit the raw turntable data
		return this.Emit(name, { raw: event })
	}

	TBA.prototype._onSpeak = require("../listen/onSpeak.js")
	TBA.prototype._onPmmed = require("../listen/onPmmed.js")
	TBA.prototype._onAddDJ = require("../listen/onAddDJ.js")
	TBA.prototype._onRemDJ = require("../listen/onRemDJ.js")
	TBA.prototype._onSong = require("../listen/onSong.js")
	TBA.prototype._onSnag = require("../listen/onSnag.js")
	TBA.prototype._onVote = require("../listen/onVote.js")
	TBA.prototype._onJoin = require("../listen/onJoin.js")
	TBA.prototype._onLeft = require("../listen/onLeft.js")

}