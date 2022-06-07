export let holding = {}

// post in chat for importance
export const bully = function (alert) {
	this.post(alert) // send both a post
	this.notify(alert) // and a notification
}

// send a desktop notification
export const notify = function (alert) {
	if (!alert.head || !alert.text) return
	if (!this.HasNotify() || document.hasFocus()) return
	if (!alert.icon) alert.icon = this.icon || ""
	let send = buildNotify(alert)
	return this.SendNotify(send, alert.type)
}

// send a notification (delayed with type)
export const SendNotify = function (send, type) {
	if (!type) return send()
	// ignore spammy notifications
	if (this.holding[type]) return
	// set a self destructing delay
	let time = 5 * 1000 // 5 seconds
	let done = () => { delete this.holding[type] }
	this.holding[type] = setTimeout(done.bind(this), time)
	return send()
}

// check notification permissions
export const HasNotify = function () {
	if (!"Notification" in window) return false
	let permission = Notification.permission
	if (permission == "denied") return false
	if (permission == "default") return this.CanNotify()
	return "permission" in Notification
}

// request notification permissions
export const CanNotify = function () {
	this.print("Requesting Notifications...")
	Notification.requestPermission()
	return false
}

// make a notification function
const buildNotify = alert => {
	let { head, text, icon } = alert
	let opts = { body: text, icon }
	return () => {
		let sent = new Notification(head, opts)
		sent.onclick = () => { window.focus(); sent.close() }
	}
}