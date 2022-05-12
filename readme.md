# tt-browser-api
Interfacing with turntable.fm in the browser.

## [ using ]
```js
let TBA = require("tt-browser-api")
let App = new TBA()

// add your functions / events 

App.Attach() // attach to turntable
````

## [ native events ]
##### `jump` - replaces *add_dj*
returns `{ user, raw }`
##### `drop` - replaces *rem_dj*
returns `{ user, stat, raw }`
--- `stat: { love, hate, snag, spun }`
##### `join` - replaces *registered*
returns `{ user, raw }`
##### `left` - replaces *deregistered*
returns `{ user, raw }`
##### `snag` - replaces *snagged*
returns `{ user, raw }`
##### `vote` - replaces *update_votes*
returns `{ user, vote, list, raw }`
--- `vote` is the vote value, usually "up"
--- `list` is the entire votelog, `user` is the last entry
##### `mail` - replaces *pmmed*
returns `{ user, text, raw }`
##### `chat` - replaces *speak*
returns `{ user, text, ping, self, raw }`
--- `ping` is a boolean, true if you've been pinged
--- `self` is a boolean, true if you sent the message
##### `song` - replaces *nosong* and *newsong*
returns `{ song, last, raw }`
--- `song` is the current song playing
--- `last` is the last played song, with `stat` tracking

## [ custom events ]
##### `list`, on playlist change
returns `{ name, list }`
##### `text`, on new chat message added
returns `{ elem }`
##### `type`, on tt typeahead appear/disappear
returns `null`
##### `user`, on new profile appearance
returns `{ user }`
##### `loop`, incremented by 1 every minute 
returns `{ beat }`
##### `load`, after being added to the HTML
returns `null`

##### `lobby`, found the lobby instead on attach
returns `null`
##### `attach`, successfully attached to fully loaded room
returns `{ room } `

## [ functions ]
##### `On(event, function)` 
bind a function to a named event
##### `Emit(name, arguments)` 
fire all functions bound to an event

##### `Attach()` 
attempt to attach to turntable

##### `Jump()`
provides access to `.becomeDj()`
##### `Drop()`
provides access to `.quitDj()`

##### `getName(id)`
return a user name from ID
##### `hasPing(str)`
check a string for a ping

##### `Debug(log, data)` 
prints debug logs if we're debugging
##### `Print(log, data)`
always print a log to the console
##### `Error(log, data)`
print a red log to the console

## [ properties ]
##### `$core` - window.turntable
##### `$user` - window.turntable.user
##### `$view` - window.turntable.topViewController
##### `$room` - window.turntable.topViewController.roomData