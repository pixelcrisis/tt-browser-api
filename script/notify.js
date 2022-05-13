// notify.js
// desktop notifications!

module.exports = TBA => {

	TBA.prototype.Notify = function (head, text, icon, type) {
		// send a desktop notification from turntable
		if (!this.enableNotify) return // not enabled
		if (!head || !text) return // sending what?
		if (!this.canNotify() || document.hasFocus()) return
		// wrap in a function for use with delay
		let send = () => {
			let icon = icon || ""
			let sent = new Notification(head, { body: text, icon })
			sent.onclick = () => { window.focus(); sent.close(); }
		}
		if (!type) send()
		else this._delayNotify(send, type)
	}

	TBA.prototype.Bully = function (head, text, icon, type) {
		// send a Post and a Notification
		this.Post(head, text, type)
		this.Notify(head, text, icon, type)
	}

	TBA.prototype._canNotify = function () {
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

	TBA.prototype._delayNotify = function (notify, type) {
		if (!this._holding) this._holding = {}
		if (this._holding[type]) return false
		// set a self-destructing delay
		let timeout = 5 * 1000 // 5 seconds
		let cleared = () => { delete this._holding[type] }
		this._holding[type] = setTimeout(cleared.bind(this), timeout)
		return notify()
	}

}

