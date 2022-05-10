// listen.js
// intercepting tt events

module.exports = TBA => {

	TBA.prototype.Listen = function (event) {
		let type = event.command
		if (!event.command) return // only commands
		this.Debug(`Received: ${ type }`, event)
		// custom handlers for most common events
		// if (type == "speak") 		return this.onSpeak(event)
		// if (type == "pmmed") 		return this.onPmmed(event)
		// if (type == "add_dj") 	return this.onAddDJ(event)
		// if (type == "rem_dj") 	return this.onRemDJ(event)
		// if (type == "nosong") 	return this.onNewSong(event)
		// if (type == "newsong") 	return this.onNewSong(event)
		// if (type == "snagged") 	return this.onSnagged(event)
		// if (type == "update_votes") return this.onVote(event)
		// if (type == "deregistered") return this.onLeft(event)
		// if (type == "registered") 	return this.onJoin(event)
		// otherwise, just emit the raw turntable data
		return this.Emit(name, event)
	}

}