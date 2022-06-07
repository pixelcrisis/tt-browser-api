export default onUser = userid => {
	let name = this.getName(userid)
	let data = { user: { id: userid, name } }
	this.emit("user", data)
}