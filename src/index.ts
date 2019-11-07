import { Application, Sprite, Loader } from './aliases'
import './css/index.css'

//Create a Pixi Application
let app = new Application({
  // `width`: The width of the renderers view.
  width: window.innerWidth, // default: 800
  // `height`: The height of the renderers view.
  height: window.innerHeight, // default: 600
  // `antialias`: Sets antialias.
  antialias: true, // default: false
  // `transparent`: If the render view is transparent.
  transparent: true, // default: false
  // `resolution`: The resolution / device pixel ratio of the renderer,
  // retina would be 2.
  resolution: 2, // default: 1
  // `autoDensity`: Resizes renderer view in CSS pixels to allow for
  // resolutions other than 1.
  autoDensity: true, // default: false
  // `resizeTo`: Element to automatically resize stage to.
  resizeTo: window,
})

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view)

const loader = Loader.shared
loader
  .add('images/character.png')
  .on('progress', handleProgress)
  .load(setup)

const sprites = {}

function handleProgress(loader, resources) {
  console.log('loading', resources.url)
  console.log('' + loader.progress, '%')
}

function setup(_, resources) {
  console.log('loaded')
  let sprite = new Sprite(resources['images/character.png'].texture)
  app.stage.addChild(sprite)
  sprites['sprite'] = sprite
}

;(window as any)._sprites = sprites
