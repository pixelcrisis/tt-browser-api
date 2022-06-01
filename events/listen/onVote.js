// listen/onVote.js
// handling awesome (or lame) votes

module.exports = function (event) {
	
	this.__cacheVote(event.room.metadata)
	// get the last vote in the list
	let room = event.room.metadata
	let last = room.votelog[ room.votelog.length - 1 ]
	// last vote returns [ userid, vote ]
	let data = {
		vote: last[1],
		user: { id: last[0], name: this.$getName(last[0]) },
		raw: event
	}

	this.$debug(`[vote] ${ user.name } (${ vote })`, data)
	this.$emit("vote", data)
	
}