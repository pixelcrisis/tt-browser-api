// bridge.js
// communicating with turntable

module.exports = {

	$user () { return window.turntable.user },
	$view () { return window.turntable.topViewController },
	$room () { return window.turntable.topViewController.roomData },
	$jump () { return window.turntable.topViewController.becomeDj() },
	$drop () { return window.turntable.topViewController.quitDj() },

	$vote (vote) { 
		let dn = vote == "down"
		if (dn) return CLICK(".lame-button")
		else return CLICK(".awesome-button")
	},

	$chat (text) { // send a real message
		if (text) window.turntable.sendMessage({
			api: "room.speak", text,
			roomid: this.$view().roomId,
			section: this.$view().section
		})
	},

	$batch (list) { // multiple real messages
		if (!list || !list.length) return false
		if (list.length > 3) this.$post(BATCH_ERROR)
		else list.forEach((msg, i) => {
			// delay to make sure they go in order
			setTimeout(this.$chat( msg.trim() ), i * 100)
		})
	},

	$post ({ type, head, text }) { // fake chat message
		if (!text) return false
		let html = POST_HTML(type, head, text )
		$(".chat .messages").append( html )
		this.$view().updateChatScroll()
	},
	
	$getName (id) {
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
	},

	$hasPing (str) { // checks for an us ping
		let list = str.split(" ") // per word
		let ping = `@${ this.$user().attributes.name }`
		return list.indexOf(ping) > -1
	},

	$getChat (text, name) { // find chat in DOM
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

const POST_HTML = (type, head, text) => `
	<div class="message ${ type || "" }">
		<span class="subject">${ head || "" }</span>
		<span class="text">${ text || "" }</span>
	</div>
`

const BATCH_ERROR = {
	head: "Too Many Messages!",
	text: "Can only send up to 3 messages at a time!"
}