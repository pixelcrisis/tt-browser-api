// import our listeners
import onChat from "./listen/onChat.js"
import onMail from "./listen/onMail.js"
import onJump from "./listen/onJump.js"
import onDrop from "./listen/onDrop.js"
import onSong from "./listen/onSong.js"
import onSnag from "./listen/onSnag.js"
import onVote from "./listen/onVote.js"
import onJoin from "./listen/onJoin.js"
import onLeft from "./listen/onLeft.js"

// listen for turntable events
const listen = function (event) {
	let type = event.command
	if (!event.command) return
	// common custom handlers
	if (type == "speak") return onChat(event)
	if (type == "pmmed") return onMail(event)
	if (type == "add_dj") return onJump(event)
	if (type == "rem_dj") return onDrop(event)
	if (type == "nosong") return onSong(event)
	if (type == "newsong") return onSong(event)
	if (type == "snagged") return onSnag(event)
	if (type == "registered") return onJoin(event)
	if (type == "deregistered") return onLeft(event)
	if (type == "update_votes") return onVote(event)
	// otherwise emit raw turntable data
	this.debug(`Unhandled: ${ type }`, event)
	return this.emit(type, { raw: event })
}

// bind the listener to turntable
export const BindListener = function () {
	this.listener = listen.bind(this)
	window.turntable.addEventListener("message", this.listener)
}

export const UnbindListener = function () {
	window.turntable.removeEventListener("message", this.listener)
}