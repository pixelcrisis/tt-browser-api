// listen/onAddDJ.js
// handling a new room DJ

module.exports = function (event) {
	for (let user of event.user) {
		let name = this.getName(user.userid)
		this.Debug(`new dj: ${ name }`, user)
	}
}