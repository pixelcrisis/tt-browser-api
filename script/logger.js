// logger.js
// handles printing logs

module.exports = TBA => {
	TBA.prototype.Debug = function (text, data) {
		this.logged("debug", text, data)
	}

	TBA.prototype.Print = function (text, data) {
		this.logged("print", text, data)
	}

	TBA.prototype.Error = function (text, data) {
		this.logged("error", text, data)
	}

	// all logpoints save to logger
	// and optionally print to console
	TBA.prototype.logged = function (type, text, data) {
		this.logs = this.logs || []
		this.logs.push({ text, data, type })
		if (type == "debug" && !this.debugs) return

		let body = `%c[TBA] ${ text }`
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