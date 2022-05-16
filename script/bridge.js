// bridge.js
// communicating with turntable

module.exports = TBA => {

	TBA.prototype.Jump = () => window.turntable.topViewController.becomeDj()
	TBA.prototype.Drop = () => window.turntable.topViewController.quitDj()

	TBA.prototype.Chat = function (text) {
		// send a real message to turntable
		if (text) window.turntable.sendMessage({
			text, api: "room.speak",
			roomid: this.$view.roomId,
			section: this.$view.section
		})
	}

	TBA.prototype.Post = function (text, subject, type) {
		// post a fake message in the chat box for the user
		if (!text) return false
		let html = POST_HTML(text, subject, type)
		$(".chat .messages").append( html )
		this.$view.updateChatScroll()
	}

	TBA.prototype.Batch = function (arr) {
		// send multiple messages to chat
		if (!arr || !arr.length) return false
		if (arr.length > 3) this.Post( ...BATCH_ERROR )
		else for (let msg of arr) this.Chat( msg.trim() )
	}
	
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

	TBA.prototype.getChat = function (text, name) {
		// find a chat message containing text
		// optionally also containing name
		let query = `.message:contains("${ text }")`
		if (name) query += `:contains("${ name }")`
		return $( query ).last()
	}

}

const POST_HTML = (text, subject, type) => `
	<div class="${ type || "" }">
		<span class="subject">${ subject || "" }</span>
		<span class="text">${ text || "" }</span>
	</div>
`

const BATCH_ERROR = [
	"Too Many Messages!",
	"Can only send up to 3 messages at a time!"
]