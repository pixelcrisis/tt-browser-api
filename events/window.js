// import our watchers
import onList from "./window/onList.js"
import onText from "./window/onText.js"
import onType from "./window/onType.js"
import onUser from "./window/onUser.js"

// watch for DOM mutations
const watch = function (mutations) {
	for (let changed of mutations) {
		let elem = changed.target
		let type = elem.className
		let head = elem.nodeName == "TITLE"
		let user = head && elem.baseURI.indexOf("profile") > 0
		if (user) user = elem.baseURI.split("profile/")[1]
		
		if (user) return onUser(user)
		if (type == "songs") return onList()
		if (type == "messages") return onText(elem)
		if (type == "typeahead") return onType()
	}
}

// watch for smaller JS events
const onEscape = () => this.emit("esc")
const onInput = event => this.emit("type", event.target.value)

export const BindWatcher = function () {
	let Observe = window.MutationObserver
	let options = { subtree: true, childList: true }
	if (!Observe) Observe = window.WebKitMutationObserver
	this.watcher = new Observe(watch.bind(this))
	this.watcher.observe(document, options)
	// bind our little mini-watchers
	this.typing = onInput.bind(this)
	this.escaping = onEscape.bind(this)
	$(document).on("keyup", this.escaping)
	$("#chat-input").on("input", this.typing)
}

export const UnbindWatcher = function () {
	$("#chat-input").off("input", this.typing)
	$(document).off("keyup", this.escaping)
	this.watcher.disconnect()
}