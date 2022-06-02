// logger.js
// handles printing logs

module.exports = {

	$logs: [],

	$debug (text, data) {
		this.__log("debug", text, data)
	},

	$print (text, data) {
		this.__log("print", text, data)
	},

	$error (text, data) {
		this.__log("error", text, data)
	},

	__log (type, text, data) {
		let time = new Date().toLocaleTimeString("en-us")
		this.$logs.push({ type, text, data, time })
		this.$emit("log", { type, text, data, time })
		if (type == "debug" && !this.debugging) return
		let body = `%c${ this.label } :: ${ text }`
		let send = [ body, CSS[ type ] ]
		if (data) send.push({ data })
		console.info( ...send )
	}

}

const CSS = {
	debug: "color: grey;",
	print: "font-weight: bold;",
	error: "font-weight: bold; color: red;"
}