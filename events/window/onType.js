export default onType = () => {
	this.emit("type", $("#chat-input").val())
}