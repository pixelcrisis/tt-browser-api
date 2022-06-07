export let logs = []

// fires console.log when this.debugging = true
export const debug = function (text, data) {
	let log = { type: "debug", data: { data }, text }
	return this.Logger(log, "color: grey;")
}

// fires console.info any time it's called
export const print = function (text, data) {
	let log = { type: "print", data: { data }, text }
	return this.Logger(log, "font-weight: bold;")
}

// fires console.error whenever called
export const error = function (text, data) {
	let log = { type: "error", data, text }
	return this.Logger(log, "font-weight: bold;")
}

// formats and prints our internal logs
export const Logger = function (log, css) {
	log.time = loggerTime() // add a timestamp
	// push and emit for every log we receive
	this.logs.push(log); this.emit("log", log)
	// don't debug to console if we aren't debugging
	if (log.type == "debug" && !this.debugging) return
	// otherwise print log to console
	let args = loggerArgs(this.label, log, css)
	if (log.type == "error") console.error(...args)
	if (log.type == "print") console.info(...args)
	if (log.type == "debug") console.log(...args)
}

const loggerTime = () => {
	let time = new Date().toLocaleTimeString("en-US")
	return time.split(" ")[0] // remove AM/PM from string
}

const loggerArgs = (label, log, css) => {
	let args = [ loggerText(label, log), css ]
	if (log.data) args.push(log.data)
	return args
}

const loggerText = (label, log) => {
	return `%c${ label } (${ log.time }) :: ${ log.text }`
}