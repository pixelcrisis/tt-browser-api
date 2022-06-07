export default onText = target => {
	let data = { target: $(target) }
	this.emit("text", data)
}