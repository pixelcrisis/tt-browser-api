// looped.js
// doing something every minute

module.exports = TBA => {

	TBA.prototype.__looped = function () {
		this.__beat += 1
		this.$emit("loop", { beat: this.__beat })
	}

	TBA.prototype.$on("attach", function () {
		let time = 60 * 1000 // one minute
		let loop = this.__looped.bind(this)
		this.__loop = setInterval(loop, time)
	})

	TBA.prototype.__beat = 0

}