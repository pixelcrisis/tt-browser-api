// toggle classes on the DOM body
export const bodyClass = function (name, on) {
	let has = $("body").hasClass(name)
	if (on && !has) $("body").addClass(name)
	if (!on && has) $("body").removeClass(name)
}

// insert a stylesheet
export const insertSheet = function (path = "#", type) { 
	if (path != "#") this.debug(`Inserting Stylesheet`, { path, type })
	// if we have a type, only include one
	let curr = type ? $(`#${ type }`) : false
	if (curr && curr.length) curr.attr("href", path)
	else document.head.append( sheetHTML(path, type) )
}

// inject css into style tags 
export const injectStyle = function (style = "", type) { 
	if (style) this.debug(`Injecting CSS`, { style, type })
	// if we have a type, only include one set
	let curr = type ? $(`#${ type }`)[0] : false
	if (curr) curr.innerHTML = style
	else document.head.append( styleHTML(style, type) )
}

const sheetHTML = (path, type) => {
	let elem = document.createElement("link")
	if (type) elem.id = type
	elem.type = "text/css"
	elem.rel = "stylesheet"
	elem.href = path
	return elem
}

const styleHTML = (style, type) => {
	let elem = document.createElement("style")
	if (type) elem.id = type
	elem.type = "text/css"
	elem.innerHTML = style
	return elem
}