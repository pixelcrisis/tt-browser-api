// click one of the voting buttons
export const vote = function (vote) {
	let meh = vote == "down"
	if (meh) return click(".lame-button")
	else return click(".awesome-button")
}

// send a message to the room
export const chat = function (text) {
	if (text) window.turntable.sendMessage({
		api: "room.speak", text,
		roomid: this.view.roomId,
		section: this.view.section
	})
}

// send array of messages to the room
export const batch = function (list) {
	if (!list || !list.length) return false
	if (list.length > 3) this.post(batchError)
	else list.forEach((msg, i) => {
		// timeout so they send in order
		let send = msg.trim()
		let time = i * 100 // delay
		setTimeout(this.chat(send), time)
	})
}

// post a fake message in the room chat
export const post = function ({ head, text, type }) {
	if (!text) return false
	let html = postHTML(head, text, type)
	$(".chat .messages").append(html)
	this.view.updateChatScroll()
}

// fetch a username from the room
export const getName = function (id) {
	id = id || "Unknown"
	// check the room locally first
	let user = this.$view().userMap[id]
	if (user) return user.attributes.name
	// maybe they're hiding in the DMs
	let chat = this.$core.buddyList.pmWindows
	if (chat && chat[id]) user = chat[id].otherUser
	if (user) return user.attributes.name
	return id
}

// check a string for a ping
export const hasPing = function (str) {
	let list = str.split(" ") // per word
	let ping = `@${ this.user.attributes.name }`
	return list.indexOf(ping) > -1
}

// find a chat message in the DOM
export const getChat = function (text, name) {
	let byText = `.message:contains("${ text }")`
	let byName = `.message:contains("${ name }")`
	let byBoth = `${ byText }:contains("${ name }")`
	if ( $(byBoth).length ) return $(byBoth)
	if ( $(byText).length ) return $(byText)
	return $(byName).last()
}

const click = vote => {
  $(window).focus()
  const opts = { bubbles: true, cancelable: true, view: window }
  const elem = document.querySelectorAll(vote)[0]
  const fire = new MouseEvent("click", opts)
  return !elem.dispatchEvent(fire)
}

const postHTML = (head, text, type) => `
	<div class="message ${ type || "" }">
		<span class="subject">${ head || "" }</span>
		<span class="text">${ text || "" }</span>
	</div>
`

const batchError = {
	head: "Too Many Messages!",
	text: "Can only send up to 3 messages at a time!"
}