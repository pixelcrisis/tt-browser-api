// insert.js
// modifying the turntable DOM

module.exports = TBA => {

	TBA.prototype.$body = function (name, on) {
		// toggle classes on the DOM body
		let has = $("body").hasClass(name)
		if (on && !has) $("body").addClass(name)
		if (!on && has) $("body").removeClass(name)
	}

	TBA.prototype.$sheet = function (path = "#", type) {
		// insert a stylesheet
		// if we have a type, only include one
		let curr = type ? $(`#${ type }`) : false
		if (path != "#") this.$debug(`Inserting Stylesheet`, { path, type })
		if (curr && curr.length) curr.attr("href", path)
		else document.head.append( SHEET_HTML(path, type) )
	}

	TBA.prototype.$style = function (style = "", type) {
		// inject CSS into style tags 
		// if we have a type, only include one set
		let curr = type ? $(`#${ type }`)[0] : false
		if (style) this.$debug(`Injecting CSS`, { style, type })
		if (curr) curr.innerHTML = style
		else document.head.append( STYLE_HTML(style, type) )
	}

}

const SHEET_HTML = (path, type) => {
	let elem = document.createElement("link")
	if (type) elem.id = type
	elem.type = "text/css"
	elem.rel = "stylesheet"
	elem.href = path
	return elem
}

const STYLE_HTML = (style, type) => {
	let elem = document.createElement("style")
	if (type) elem.id = type
	elem.type = "text/css"
	elem.innerHTML = style
	return elem
}