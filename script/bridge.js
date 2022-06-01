// bridge.js
// communicating with turntable

module.exports = TBA => {

	TBA.prototype.$user = () => window.turntable.user
	TBA.prototype.$view = () => window.turntable.topViewController
	TBA.prototype.$room = () => window.turntable.topViewController.roomData
	TBA.prototype.$jump = () => window.turntable.topViewController.becomeDj()
	TBA.prototype.$drop = () => window.turntable.topViewController.quitDj()

	TBA.prototype.$vote = vote => {
		if (vote == "lame") vote = ".lame-button"
		else vote = ".awesome-button"
		return CLICK( vote )
	}

	TBA.prototype.$chat = function (text) {
		// send a real message to turntable
		if (text) window.turntable.sendMessage({
			text, api: "room.speak",
			roomid: this.$view().roomId,
			section: this.$view().section
		})
	}

	TBA.prototype.$post = function ({ head, text, type }) {
		// post a fake message in the chat box for the user
		if (!text) return false
		let html = POST_HTML(text, head, type)
		$(".chat .messages").append( html )
		this.$view().updateChatScroll()
	}

	TBA.prototype.$batch = function (arr) {
		// send multiple messages to chat
		if (!arr || !arr.length) return false
		if (arr.length > 3) this.$post( ...BATCH_ERROR )
		else for (let msg of arr) this.$chat( msg.trim() )
	}
	
	TBA.prototype.$getName = function (id) {
		id = id || "Unknown"
		// check the room locally first
		let User = this.$view().userMap[id]
		if (User) return User.attributes.name
		// maybe they're hiding in the DMs
		let Chat = this.$core.buddyList.pmWindows
		if (Chat && Chat[id]) User = Chat[id].otherUser
		if (User) return User.attributes.name
		// we'll check the API for a name otherwise later
		// when I feel like figuring out async (todo)
		return id
	}

	TBA.prototype.$hasPing = function (str) {
		// just checks a string for an us ping
		let list = str.split(" ") // per word
		let ping = `@${ this.$user().attributes.name }`
		return list.indexOf(ping) > -1
	}

	TBA.prototype.$getChat = function (text, name) {
		// find a chat message containing text
		// optionally also containing name
		let query = `.message:contains("${ text }")`
		if (name) query += `:contains("${ name }")`
		return $( query ).last()
	}

}

const CLICK = vote => {
  $(window).focus()
  const opts = { bubbles: true, cancelable: true, view: window }
  const elem = document.querySelectorAll(vote)[0]
  const fire = new MouseEvent("click", opts)
  return !elem.dispatchEvent(fire)
}

const POST_HTML = (text, subject, type) => `
	<div class="message ${ type || "" }">
		<span class="subject">${ subject || "" }</span>
		<span class="text">${ text || "" }</span>
	</div>
`

const BATCH_ERROR = [
	"Too Many Messages!",
	"Can only send up to 3 messages at a time!"
]