// mutate.js
// intercepting dom changes

module.exports = {

	// import our mutate watchers
	__onList: require("./mutate/onList.js"),
	__onText: require("./mutate/onText.js"),
	__onType: require("./mutate/onType.js"),
	__onUser: require("./mutate/onUser.js"),

	__mutate (mutations) {
		for (let changed of mutations) {
			// parse the changed element
			let element = changed.target
			let elClass = element.className
			let elTitle = element.nodeName == "TITLE"
			let profile = element.baseURI.indexOf("profile/") > 0

			if (elClass == "songs") return this.__onList()
			if (elClass == "messages") return this.__onText(element)
			if (elClass == "typeahead") return this.__onType()

			if (elTitle && profile) {
				let userid = element.baseURI.split("profile/")[1]
				return this.__onUser(userid)
			}
		}
	},

	__escape (event) {
		if (event.key != "Escape") return
		this.$emit("esc")
	},

	__bindMutation () {
		let Observe = window.MutationObserver
		if (!Observe) Observe = window.WebKitMutationObserver
		this.__mutation = new Observe(this.__mutate.bind(this))
		this.__mutation.observe(document, { subtree: true, childList: true })
		// bind up our escape handler
		this.__escaping = this.__escape.bind(this)
		$(document).on("keyup", this.__escaping)
	}
	
}