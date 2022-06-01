// logger.js
// handles printing logs

module.exports = TBA => {
	
	TBA.prototype.$debug = function (text, data) {
		this.__log("debug", text, data)
	}

	TBA.prototype.$print = function (text, data) {
		this.__log("print", text, data)
	}

	TBA.prototype.$error = function (text, data) {
		this.__log("error", text, data)
	}

	// all logpoints save to logger
	// and optionally print to console
	TBA.prototype.__log = function (type, text, data) {
		let time = new Date().toLocaleTimeString("en-us")
		this.logs = this.logs || []
		this.logs.push({ text, data, type, time })
		this.$emit("log", { text, data, type, time })
		// if (type == "debug" && !this.debugging) return

		let body = `%c${ this.label } :: ${ text }`
		let info = [ body, CSS[type] ]
		if (data) info.push(data)
		console.info(...info)
	}

}

const CSS = {
	debug: "color: grey;",
	print: "font-weight: bold;",
	error: "font-weight: bold; color: red;"
}