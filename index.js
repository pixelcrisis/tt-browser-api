class TBA {
	// tt-browser-api (TBA) 
	// a thing by pixelcrisis
	// for handling turntable.fm
	constructor(options = {}) { 
		const pkg = require("./package.json")
		this.name = options.name || "TBA"
		this.version = options.version || pkg.version
		this.api_version = pkg.version
		this.debugging = options.debugging || false
		this.Debug("Initialized")
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