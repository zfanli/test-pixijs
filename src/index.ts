import * as PIXI from 'pixi.js'

import './css/index.css'

let type = 'WebGL'
if (!PIXI.utils.isWebGLSupported()) {
  type = 'canvas'
}

PIXI.utils.sayHello(type)

const div = document.createElement('div')
div.innerText = 'Hello, everything is ready.'
document.getElementById('root').appendChild(div)
