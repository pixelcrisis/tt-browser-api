// listen/onRemDJ.js
// handling a DJ dropping down

module.exports = function (event) {
	for (let user of event.user) {
		let name = this.getName(user.userid)
		this.Debug(`old dj: ${ name }`, user)
	}
}