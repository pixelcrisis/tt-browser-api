// looped.js
// doing something every minute

module.exports = {

	__beat: 0,

	__looped () {
		this.__beat += 1
		let data = { beat: this.__beat }
		this.$emit("loop", data)
	},

	__bindLooped () {
		let time = 60 * 1000 // one minute
		let loop = this.__looped.bind(this)
		this.__loop = setInterval(loop, time)
	}

}