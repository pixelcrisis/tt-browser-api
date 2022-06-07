export default onList = () => {
	let list = window.turntable.playlist
	if (!list) return false
	let curr = list.activePlaylist
	if (curr == this.playlist) return false
	this.playlist = curr
	this.emit("list", list)
}