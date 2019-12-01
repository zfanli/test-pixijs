export function keyboard(value: String) {
  const key = {
    value,
    press: undefined,
    release: undefined,
    isDown: false,
    isUp: true,
    downHandler: function(event: KeyboardEvent) {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press()
        key.isDown = true
        key.isUp = false
        event.preventDefault()
      }
    }.bind(this),
    upHandler: function(event: KeyboardEvent) {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release()
        key.isDown = false
        key.isUp = true
        event.preventDefault()
      }
    }.bind(this),
    unsubscribe: undefined,
  }

  window.addEventListener('keydown', key.downHandler)
  window.addEventListener('keyup', key.upHandler)

  key.unsubscribe = function() {
    window.removeEventListener('keydown', key.downHandler)
    window.removeEventListener('keyup', key.upHandler)
  }

  return key
}
