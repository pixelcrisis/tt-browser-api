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
		let time = new Date().toLocaleTimeString("en-us").split(" ")[0]
		this.$logs.push({ type, text, data, time })
		this.$emit("log", { type, text, data, time })
		if (type == "debug" && !this.debugging) return
		let send = [ LOG( time, this.label, text ), CSS[ type ] ]
		if (data) send.push(type == "error" ? data : { data })
		if (type == "error") return console.error( ...send )
		if (type == "debug") return console.info( ...send )
		if (type == "print") return console.log( ...send )
	}

}

const LOG = (time, label, text) => {
	return `%c${ label } (${ time }) :: ${ text }`
}

const CSS = {
	debug: "color: grey;",
	print: "font-weight: bold;",
	error: "font-weight: bold;"
}