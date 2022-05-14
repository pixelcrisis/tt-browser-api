# tt-browser-api
Interfacing with turntable.fm in the browser. Handles the heavy lifting for integrating with turntable events and functions, as well as manipulating the site itself. In the future, it will be powerful enough to use the browser to run a bot on turntable.fm. 

## [ using the api ]
```js
let TBA = require("tt-browser-api")
let App = new TBA({
	name: "App", // change the logging prefix
	version: require("./package.json").version,
	debugging: false // true for more logs
})

// add your functions
App.doThing = function () {
	// some logic
}

// bind your events
App.On("chat", function (event) {
	console.log(event)
})

// get started
App.Attach()
````

## [ projects using TBA ]

### [turnStyles](https://github.com/pixelcrisis/turnstyles)

## [ getting started ]

Check Out The Docs Folder For Overviews!