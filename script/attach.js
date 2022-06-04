// attach.js
// initialize with turntable

module.exports = {

	$attach () {
		// make sure that tt exists
		if (!this.__loadCore()) return false
		// find the room if tt exists
		if (!this.__loadRoom()) return this.__reattach()
		// bind up our access to turntable
		let [ named, count ] = this.__attached()
		this.$print(`Attached to ${ named } (${ count } Users)`)
		this.$emit("attach", { room: this.$room() })
	},

	$detach () {
		// un bind and remove
		this.$debug(`Detaching...`)
		clearInterval(this.__loop)
		this.__mutation.disconnect()
		$(document).off("keyup", this.__escaping)
		this.$core.removeEventListener("message", this.__listener)
		this.$print(`Detached`)
	},

	__attached () {
		this.__bindLooped()
		// bind our event handlers
		this.__bindMutation()
		this.__bindListener()
		this.__cacheRoom(this.$room().metadata)
		// return the room name and listeners
		let named = this.$room().name
		let count = this.$view().numListeners()
		return [ named, count ]
	},

	__reattach () {
		// try again until it works!
		let again = this.$attach.bind(this)
		return setTimeout(again, 200)
	}

}