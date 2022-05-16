// mutate.js
// intercepting dom changes

module.exports = TBA => {

	TBA.prototype.Mutate = function (mutations) {
		for (let changed of mutations) {
			// parse the changed element
			let element = changed.target
			let elClass = element.className
			let elTitle = element.nodeName == "TITLE"
			let profile = element.baseURI.indexOf("profile/") > 0

			if (elClass == "songs") return this._onList()
			if (elClass == "messages") return this._onText(element)
			if (elClass == "typeahead") return this._onType()

			if (elTitle && profile) {
				let userid = element.baseURI.split("profile/")[1]
				return this._onUser(userid)
			}
		}
	}

	TBA.prototype.bindMutations = function () {
		let Observe = window.MutationObserver
		if (!Observe) Observe = WebKitMutationObserver
		this.watcher = new Observe(this.Mutate.bind(this))
		this.watcher.observe(document, { subtree: true, childList: true })
	}

	TBA.prototype._onList = require("./mutate/onList.js")
	TBA.prototype._onText = require("./mutate/onText.js")
	TBA.prototype._onType = require("./mutate/onType.js")
	TBA.prototype._onUser = require("./mutate/onUser.js")

}