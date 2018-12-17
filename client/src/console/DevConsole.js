let colors = {
  log: 'hsl(0, 0%, 96%)',
  info: '#0fb9b1',
  warning: '#fa8231',
  error: '#eb3b5a'
}

/**
 * Provides styled console message
 */
export function log (message) {
  // Log a header message (with the coresponding color)
  console.log(
    `%c [${message.time.getHours()}:${message.time.getMinutes()}:${message.time.getSeconds()}] ${message.text} `,
    `border-radius: 4px; background-color: ${colors[message.type]}; color: hsl(0, 0%, 14%);`)
  if (message.payload != null) {
    console.log(message.payload)
  }
}
