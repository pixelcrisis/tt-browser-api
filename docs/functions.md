# Native Functions

Function | Notes
-------- | -----
`Chat(text)` | send a real message to turntable
`Batch(array)` | send multiple (max 3) messages to turntable<br />`array` - an array of strings to send
`getName(id)` | return a user's name from their ID
`getChat(text, name)` | finds the DOM element for message
`hasPing(string)` | checks a string for ping of the user
`Jump()` | provides access to `.becomeDj()`
`Drop()` | provides access to `.quitDj()`

# Custom Functions

Function | Notes
-------- | -----
`Attach()` | attempt to attach to turntable
`Detach()` | detaches and unbinds itself from tt events
`On(event, function)` | bind a function to named event
`Emit(name, args)` | emit functions bound to event name
`Post(text, subject, type)` | add a fake message to the chat<br />`subject` is the bold prefix<br />`type` is a class added to the message
`Notify(head, text, icon, type)` | sends a desktop notification<br />`head` - notification title (required) <br />`text` - notification body text (required)<br />`icon` - notificaiton icon (recommended)<br />`type` - enables spam-delay prevention`
`Bully(head, text, icon, type` | send both Post and Notify

# DOM Functions

Function | Notes
-------- | -----
`Body(class, on)` | toggles a class on the body<br />`class` is the class to toggle<br />on is a boolean for off or on
`Sheet(path, type)` | injects a stylesheet into the DOM<br />`path` is the location of the sheet<br />`type` will be added as an ID for hotswapping
`Style(style, type)` | injects CSS code into the DOM<br />`style` css that will be added in style tags<br />`type` will be added as an ID for hotswapping

# Miscellaneous Functions

Function | Notes
-------- | -----
`Debug(log, data)` | prints a log if we're debugging
`Print(log, data)` | always prints the log to console
`Error(log, data)` | print a red log to the console