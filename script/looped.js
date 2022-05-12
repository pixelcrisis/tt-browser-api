// looped.js
// doing something every minute

module.exports = TBA => {

	TBA.Looped = function () {
		this.beat = this.beat ? this.beat + 1 : 1
		let data = { beat: this.beat }
		this.Emit("loop", data)
	}

	TBA.bindLooped = function () {
		let looped = this.Looped.bind(this)
		let timing = 60 * 1000 // one minute
		this.loop = setInterval(looped, timing)
	}

}