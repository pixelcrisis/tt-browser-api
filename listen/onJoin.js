// listen/onJoin.js
// handling user join

module.exports = function (event) {
	for (let user of event.user) {
		this.Debug(`join: ${ user.name }`, user)
	}
}