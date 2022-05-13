# Native Events

Event Name | Fires On | Returns | Notes
---------- | -------- | ------- | -----
jump | Add DJ | `{ user, raw }` | `{ raw }` is the raw tt event data
drop | Rem DJ | `{ user, stat, raw }` | `stat: { love, hate, snag, spun }`
join | User Join | `{ user, raw }` |
left | User Leave | `{ user, raw }` |
snag | Snagged | `{ user, vote, list, raw }` | `vote` is the vote value, e.g. "up"<br />`list` is the votelog, `user` and `vote` are the last entry |
mail | Pmmed | `{ user, text, raw }` | 
chat | Speak | `{ user, text, ping, self, raw }` | `ping` is true if youv'e been pinged<br />`self` is true if you sent the message | 
song | New Song, No Song | `{ song, last, raw }` | `song` is currently playing<br />`last` is the last song, with `stat` tracking | 

# Custom Events

Event Name | Fires On | Returns | Notes
---------- | -------- | ------- | -----
list | Playlist Change | `{ name, list }` | 
text | New Chat Message | `{ elem }` | includes system chat
type | TT Typeahead | `null` | detects visibility of typeahead
user | Profile View | `{ user }` | detects the profile modals
loop | Every Minute | `{ beat }` | `beat` is the number of minutes since launch |
load | On TBA Load | `null` | when the script is first injected
lobby | In The Lobby | `null` | replaces `attach` when in the lobby
attach | On Attach | `{ room }` | successfully attached to the room! | 