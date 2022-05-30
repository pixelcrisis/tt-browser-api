// mutate.js
// intercepting dom changes

module.exports = TBA => {

	TBA.prototype.__mutate = function (mutations) {
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
	}

	TBA.prototype.$on("attach", function () {
		let Observe = window.MutationObserver
		if (!Observe) Observe = window.WebKitMutationObserver
		this.__watcher = new Observe(this.__mutate.bind(this))
		this.__watcher.observe(document, { subtree: true, childList: true })
	})

	TBA.prototype.__onList = require("./mutate/onList.js")
	TBA.prototype.__onText = require("./mutate/onText.js")
	TBA.prototype.__onType = require("./mutate/onType.js")
	TBA.prototype.__onUser = require("./mutate/onUser.js")

}