// tt-browser-api (TBA) | a thing by pixelcrisis
// for handling turntable.fm in the web browser
const API = require("./package.json")

// first things first, import the realest
// aka all of our scripts we need to add
const REQ = {
	...require("./script/logger.js"),
	...require("./script/events.js"),
	...require("./events/listen.js"),
	...require("./events/mutate.js"),
	...require("./script/looped.js"),
	...require("./script/cached.js"),
	...require("./script/bridge.js"),
	...require("./script/notify.js"),
	...require("./script/insert.js"),
	...require("./script/loader.js"),
	...require("./script/attach.js")
}

// import our imports into the class
const ADD = function (obj, self) {
	for (let [ key, prop ] of Object.entries(obj)) {
		self[key] = prop.bind ? prop.bind(self) : prop
	}
}

class TBA {
	constructor(options = {}) {
		// apply our options
		Object.assign(this, options)
		// apply some default properties
		this.api_version = API.version
		if (!this.name) this.name = API.name
		if (!this.label) this.label = "TBA"
		ADD( REQ, this ) // bind imports
		this.$debug("Initialized")
	}
}

// export the library
module.exports = TBA