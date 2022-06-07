// attach to turntable
export const attach = function () {
	if (!this.__looking) this.Find()
	if (!this.FindTT()) return false
	if (!this.FindRoom()) return this.Reattach()
	// we have finally found everything and attached
	let [ named, count ] = this.Attached()
	this.print(`Attached to ${ named } (${ count } Users)`)
	this.emit("attach", { room: this.room })
}

// detach from turntable
export const detach = function () {
	this.debug("Detaching...")
	this.UnbindLoop()
	this.UnbindWatcher()
	this.UnbindListener()
	this.print("Detached")
}

// when we attach, fire it all up
export const Attached = function () {
	this.BindLoop()
	this.BindWatcher()
	this.BindListener()
	this.RecordRoom(this.room.metadata)
	let named = this.room.name
	let count = this.view.numListeners()
	return [ named, count ]
}

// fire it later to see if it loaded yet
export const Reattach = function () {
	let again = this.attach.bind(this)
	return setTimeout(again, 200)
}