// events.js
// the TBA event bus

module.exports = TBA => {

	TBA.prototype.On = function (name, func) {
		// the main binding function
		// ensure we have an event list
		if (!this.events) this.events = {}
		if (!this.events[name]) this.events[name] = []
		// bind the function, add it to the list
		this.events[name].push( func.bind(this) )
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
	require("./events/listen.js")(TBA)
	require("./events/mutate.js")(TBA)

}