export default function prevented(handler) {
  return event => {
    event.preventDefault()
    event.stopPropagation()
    handler(event)
  }
}
