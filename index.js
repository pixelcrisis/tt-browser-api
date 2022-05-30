const API = require("./package.json")
// tt-browser-api (TBA) | a thing by pixelcrisis
// for handling turntable.fm in the web browser
class TBA {
	constructor(options = {}) {
		Object.assign(this, options)
		// apply some default properties
		this.api_version = API.version
		if (!this.name) this.name = API.name
		if (!this.label) this.label = "TBA"
		this.$debug("Initialized")
	}
}

// first things first, import the realest
// aka all of our scripts and build out the function
// require the script, and pass the API library
require("./script/logger.js")(TBA)
require("./script/events.js")(TBA)
require("./script/looped.js")(TBA)
require("./script/cached.js")(TBA)
require("./script/bridge.js")(TBA)
require("./script/notify.js")(TBA)
require("./script/insert.js")(TBA)
require("./script/attach.js")(TBA)

// export the library
module.exports = TBA