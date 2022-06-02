// mutate/onList.js
// handling playlist updates

module.exports = function () {
	if (this.__listDelay) {
		clearTimeout(this.__listDelay)
		delete this.__listDelay
	}

	let onList = function () {
		let list = window.playlist.fileids
		let name = window.playlist.activePlaylist
		let data = { name, list }
		this.$debug(`[list]: ${ name }`, data)
		this.$emit("list", data)
	}

	// wait for half a second for updating to finish
	this.__listDelay = setTimeout(onList.bind(this), 500)
}