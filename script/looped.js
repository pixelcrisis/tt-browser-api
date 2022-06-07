export const beat = 0

// fires every minute
const loop = function () {
	this.beat += 1
	let data = { beat: this.beat }
	this.emit("loop", data)
}

export const BindLoop = function () {
	let looping = loop.bind(this)
	this.looped = setInterval(looping, 60 * 1000)
}

export const UnbindLoop = function () {
	clearInterval(this.looped)
}