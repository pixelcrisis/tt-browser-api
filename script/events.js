// events.js
// the TBA event bus

module.exports = TBA => {

	TBA.prototype.On = function (names, funcs) {
		// ensure we have an event bus
		if (!this.events) this.events = {}
		// force arrays on non-arrays
		if (!Array.isArray(names)) names = [ names ]
		if (!Array.isArray(funcs)) funcs = [ funcs ]
		// the main binding function
		names.forEach(name => {
			if (!this.events[name]) this.events[name] = []
			funcs.forEach(func => {
				this.events[name].push( func.bind(this) )
			})
		})
	}

	TBA.prototype.Emit = function (name, ...args) {
		let list = this.events ? this.events[name] : false
		// fire functions bound to the event list
		if (list) for (let func of list) {
			// attempt to handle errors with try / catch
			try { func(...args) }
			catch (e) { 
				// print out where we failed
				let head = `Event (${ name })`
				let text = `Function (${ func.toString() })`
				this.Error(`${ head } - ${ text }`, e)
			}
		}
	}

	// import listener/mutate events
	require("../events/listen.js")(TBA)
	require("../events/mutate.js")(TBA)

}