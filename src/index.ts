import { Application, Sprite, Loader, TextureCache } from './aliases'
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

const images = [
  'images/character.png',
  'images/dungeon.png',
  'images/door.png',
  'images/explorer.png',
  'images/treasure.png',
  'images/blob.png',
]

function getSprite(id: String) {
  // return new Sprite(resources[id as any].texture)
  return new Sprite(TextureCache[id as any])
}

function getRandomY(max: number, min: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function range(num: number) {
  return new Array(num).fill(0).map((_, i) => i)
}

const loader = Loader.shared
loader
  .add(images)
  .on('progress', handleProgress)
  .load(setup)

const sprites = {}

function handleProgress(loader, resources) {
  console.log('loading', resources.url)
  console.log('' + loader.progress, '%')
}

let dungeon: PIXI.Sprite
let door: PIXI.Sprite
let explorer: PIXI.Sprite
let treasure: PIXI.Sprite
let blob: PIXI.Sprite[] = []
let controllers = {
  explorer: { vx: 0, vy: 0, base: 1 },
  blob: range(6).map(() => ({ vx: 0, vy: 0, base: 1 })),
}

function setup(_, _resources) {
  console.log('loaded')
  dungeon = getSprite(images[1])
  app.stage.addChild(dungeon)

  door = getSprite(images[2])
  door.x = 32
  app.stage.addChild(door)

  explorer = getSprite(images[3])
  explorer.x = 68
  explorer.y = app.stage.height / 2 - explorer.height / 2
  app.stage.addChild(explorer)

  treasure = getSprite(images[4])
  treasure.x = app.stage.width - treasure.width - 48
  treasure.y = app.stage.height / 2 - treasure.height / 2
  app.stage.addChild(treasure)

  range(6).forEach((_, i) => {
    const b = getSprite(images[5])
    b.x = i * 48 + 150
    b.y = getRandomY(app.stage.height - b.height * 2, b.height)
    app.stage.addChild(b)
    blob.push(b)
  })

  app.ticker.add(delta => mainLoop(delta))

  animateBlobs()
}

function mainLoop(delta: number) {
  movingBlobs(delta)
  movingExplorer(delta)
}

function movingBlobs(_delta: number) {
  blob.forEach((b, i) => {
    b.y += controllers.blob[i].vy
    controllers.blob[i].vy = 0
  })
}

function movingExplorer(_delta: number) {
  explorer.x += controllers.explorer.vx
  explorer.y += controllers.explorer.vy
  controllers.explorer.vx = 0
  controllers.explorer.vy = 0
}

function animateBlobs() {
  blob.forEach((b, i) => {
    setTimeout(
      () =>
        setInterval(() => {
          b.y += 1 * controllers.blob[i].base
          controllers.blob[i].base *= -1
        }, 500),
      300 * (i % 2) + 1
    )
  })
}

// For debug
;(window as any)._sprites = sprites
