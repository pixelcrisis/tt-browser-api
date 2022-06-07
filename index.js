import API from "./package.json"
// tt-browser-api (TBA) - a thing by pixelcrisis
// built for handling turntable.fm in the browser

// import all of our library plugins
import * as Logger from "./script/logger.js"
import * as Events from "./script/events.js"
import * as Listen from "./events/listen.js"
import * as Window from "./events/window.js"
import * as Looped from "./script/looped.js"
import * as Record from "./script/record.js"
import * as Bridge from "./script/bridge.js"
import * as Notify from "./script/notify.js"
import * as Insert from "./script/insert.js"
import * as Finder from "./script/finder.js"
import * as Attach from "./script/attach.js"

class TBA {
  constructor(options = {}) {
    Object.assign(this, options)
    this.build = API.version
    this.label = this.label || "TBA"
    this.name = this.name || API.name
    this.debug("Initialized")
  }
}

// bind all of our library plugins
Object.assign(TBA.prototype, Logger)
Object.assign(TBA.prototype, Events)
Object.assign(TBA.prototype, Listen)
Object.assign(TBA.prototype, Window)
Object.assign(TBA.prototype, Looped)
Object.assign(TBA.prototype, Record)
Object.assign(TBA.prototype, Bridge)
Object.assign(TBA.prototype, Notify)
Object.assign(TBA.prototype, Insert)
Object.assign(TBA.prototype, Finder)
Object.assign(TBA.prototype, Attach)

// export library
export default TBA