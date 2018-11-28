/**
 * Provides styled console message
 */
export function logError (message, payload = null) {
  console.log(`%c ${message} `, 'border: 1px solid #ff5e57; border-radius: 4px; background-color: #ff3f34; color: #fff;')
  if (payload != null) {
    console.error(payload)
  }
}
