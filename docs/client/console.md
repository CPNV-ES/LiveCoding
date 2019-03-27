# Console

The console component is diplayed on bottom of the game, it allows to log little messages to the user, withot opening the browser console. Like syntax errors when the user starts his script.

## How it works

The console component is binded to the console messages store, so when a new message is commited to the global store of the app, the console component will automaticaly update the dom to show the message.

## How to use it

Like all other store updates, you must use the mutations to commit new messages to the store. To easily create log/errors/success messages, a few actions are available on the store to direcly commit the type of message you want.

Examples :
```js
// Add a success message in a vue component (anywhere in the app)
this.$store.dispatch('console/success', 'A success message !!!')

// Add a warning message from a store action
myAction ({ dispatch }) => {
  dispatch('console/warning', 'My warning message')
}
```

### Available message types

* `console/log` : white
* `console/info` : blue
* `console/success` : green
* `console/warning` : yellow
* `console/error` : red
