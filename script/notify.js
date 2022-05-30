// notify.js
// desktop notifications!

module.exports = TBA => {

	TBA.prototype.$notify = function ({ head, text, type, icon }) {
		// send a desktop notification from turntable
		if (!head || !text) return // sending what?
		if (!this.__canNotify() || document.hasFocus()) return
		// wrap in a function for use with delay
		let send = () => {
			let icon = icon || this.icon || ""
			let sent = new Notification(head, { body: text, icon })
			sent.onclick = () => { window.focus(); sent.close(); }
		}
		if (!type) send()
		else this.__delayNotify(send, type)
	}

	TBA.prototype.$bully = function (alert) {
		this.$post(alert) // send both a post
		this.$notify(alert) // and a notification
	}

	TBA.prototype.__canNotify = function () {
		// check for notification permissions
		if (!"Notification" in window) return false
		if (Notification.permission == "denied") return false
		if (Notification.permission == "default") {
			// ask for permissions
			this.Print(`Requesting Notification Permissions`)
			Notification.requestPermission()
			return false
		}
		return true
	}

	TBA.prototype.__delayNotify = function (notify, type) {
		if (!this._holding) this._holding = {}
		if (this._holding[type]) return false
		// set a self-destructing delay
		let timeout = 5 * 1000 // 5 seconds
		let cleared = () => { delete this._holding[type] }
		this._holding[type] = setTimeout(cleared.bind(this), timeout)
		return notify()
	}

}

