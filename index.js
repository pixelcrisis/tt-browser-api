class TBA {
	// tt-browser-api (TBA) - a thing by pixelcrisis
	// a browser API for interacting with turntable.fm
	constructor() { this.Debug("Initialized") }
}

// first things first, import the realest
// aka all of our scripts and build out the function
// require the script, and pass the API library
require("./script/logger.js")(TBA)
require("./script/bridge.js")(TBA)
require("./script/events.js")(TBA)
require("./script/listen.js")(TBA)
require("./script/mutate.js")(TBA)
require("./script/cached.js")(TBA)
require("./script/attach.js")(TBA)

// add our current version because it's cool
const pkg = require("./package.json")
TBA.prototype.api_version = pkg.version
// remove in production, obviously
TBA.prototype.debugs = true

// export the library
module.exports = TBA