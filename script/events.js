// events.js
// the TBA event bus

module.exports = {

	__events: {},

	$on (names, funcs) {
		// force arrays for single strings
		if (!Array.isArray(names)) names = [ names ]
		if (!Array.isArray(funcs)) funcs = [ funcs ]
		names.forEach(name => {
			let list = this.__events[name]
			if (!list) this.__events[name] = list = []
			funcs.forEach(func => list.push( func.bind(this) ))
		})
	},

	$emit (name, ...args) {
		let list = this.__events[name] || false
		// attempt to handle errors with try / catch
		if (list) for (let func of list) {
			try { func(...args) }
			catch (e) { this.$error(`Event (${ name })`, e) }
		}
	}

}