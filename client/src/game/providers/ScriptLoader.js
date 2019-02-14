/**
 * This function allow to easily load scripts globally in the app
 * Used to load game libraries
 * @param {string} src
 */
export default function (src) {
  return new Promise((resolve, reject) => {
    // We create a script element
    let script = document.createElement('script')
    script.src = src
    // The promise callbac's are mappet to the script tag event
    script.onload = resolve
    script.onerror = reject
    // Create the element (the scipt will be loaded by the browser)
    document.head.appendChild(script)
  })
}
