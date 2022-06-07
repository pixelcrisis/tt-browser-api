export let Events = {}

// bind functions to our internal events
export const on = function (names, funcs) {
	// force arrays on single string bindings
	if (!Array.isArray(names)) names = [ names ]
	if (!Array.isArray(funcs)) funcs = [ funcs ]
	names.forEach(name => { // go through events
		let list = this.Events[name] // ensure list
		if (!list) this.Events[name] = list = []
		// bind all of the functions for that event
		funcs.forEach(func => list.push(func.bind(this)))
	})
}

// fire functions bound to our internal events
export const emit = function (name, ...args) {
	let list = this.Events[name] || false
	if (list) for (let func of list) {
		// use try/catch to handle errors sort of
		try { func(...args) }
		catch (e) { this.error(`Event (${ name })`, e) }
	}
}