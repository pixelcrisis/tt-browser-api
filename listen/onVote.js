// listen/onVote.js
// handling awesome (or lame) votes

module.exports = function (event) {
	this.cacheVote()
	// get the last vote in the list
	let list = event.room.metadata.votelog
	let [ userid, vote ] = list[ list.length - 1 ]
	// package up our pseudo event data
	let user = { userid, name: this.getName(userid) }
	let data = { user, vote, list, raw: event }
	this.Debug(`[vote] ${ user.name } (${ vote })`, data)
	this.Emit("vote", data)
}