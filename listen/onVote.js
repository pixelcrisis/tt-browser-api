// listen/onVote.js
// handling awesome (or lame) votes

module.exports = function (event) {
	let list = event.room.metadata.votelog
	let last = list[ list.length - 1 ]

	let user = last[0]
	let vote = last[1]
	let name = this.getName(user)
	this.Debug(`vote: ${ name } ${ vote }`, user)
}