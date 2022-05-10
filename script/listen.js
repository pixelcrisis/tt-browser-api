// listen.js
// intercepting tt events

module.exports = TBA => {

	TBA.prototype.Listen = function (event) {
		let type = event.command
		if (!event.command) return // only commands
		this.Debug(`Received: ${ type }`, event)
		// custom handlers for most common events
		if (type == "speak") 		return this.onSpeak(event)
		if (type == "pmmed") 		return this.onPmmed(event)
		if (type == "add_dj") 	return this.onAddDJ(event)
		if (type == "rem_dj") 	return this.onRemDJ(event)
		if (type == "nosong") 	return this.onSong(event)
		if (type == "newsong") 	return this.onSong(event)
		if (type == "snagged") 	return this.onSnag(event)
		if (type == "update_votes") return this.onVote(event)
		if (type == "deregistered") return this.onLeft(event)
		if (type == "registered") 	return this.onJoin(event)
		// otherwise, just emit the raw turntable data
		return this.Emit(name, event)
	}

	TBA.prototype.onSpeak = require("../listen/onSpeak.js")
	TBA.prototype.onPmmed = require("../listen/onPmmed.js")
	TBA.prototype.onAddDJ = require("../listen/onAddDJ.js")
	TBA.prototype.onRemDJ = require("../listen/onRemDJ.js")
	TBA.prototype.onSong = require("../listen/onSong.js")
	TBA.prototype.onSnag = require("../listen/onSnag.js")
	TBA.prototype.onVote = require("../listen/onVote.js")
	TBA.prototype.onJoin = require("../listen/onJoin.js")
	TBA.prototype.onLeft = require("../listen/onLeft.js")

}