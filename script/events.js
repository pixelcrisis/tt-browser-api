// events.js
// the TBA event bus

module.exports = TBA => {

	TBA.prototype.$on = function (names, funcs) {
		// force arrays on non-arrays
		if (!Array.isArray(names)) names = [ names ]
		if (!Array.isArray(funcs)) funcs = [ funcs ]
		// the main binding function
		names.forEach(name => {
			if (!this.__events[name]) this.__events[name] = []
			funcs.forEach(func => {
				this.__events[name].push( func.bind(this) )
			})
		})
	}

	TBA.prototype.$emit = function (name, ...args) {
		let list = this.__events[name] || false
		// fire functions bound to the event list
		if (list) for (let func of list) {
			// attempt to handle errors with try / catch
			try { func(...args) }
			catch (e) { this.$error(`Event (${ name })`, e) }
		}
	}

	TBA.prototype.__events = {}
	// define our own psuedo store
	TBA.prototype.$now_playing = {}
	TBA.prototype.$last_played = {}
	TBA.prototype.$current_djs = {}

	// import listener/mutate events
	require("../events/listen.js")(TBA)
	require("../events/mutate.js")(TBA)

}