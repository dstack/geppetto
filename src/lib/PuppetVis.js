import $ from 'webpack-zepto'
// import { Live2DSpriteDesktop } from './pixi-live2d/MonkeyPatch'
const PIXI = require('pixi.js')
require('pixi-live2d/src/index')
require('./lipSyncToAnalyser')
const settings = require('electron-settings')

if (!settings.has('me.bgColor')) {
  settings.set('me.bgColor', '00ff00')
}

function getBGColor () {
  let colorStr = settings.get('me.bgColor')
  console.log(colorStr, parseInt(colorStr, 16))
  return parseInt(colorStr, 16) >>> 0
}

// setup the container
let mainCT = $('<div id="control-ct" />')
$('body').append(mainCT)

// setup the PIXI app
let PIXIApp = new PIXI.Application(
  600, 600,
  {
    backgroundColor: getBGColor()
  }
)

settings.watch('me.bgColor', (nval, oval) => {
  PIXIApp.renderer.backgroundColor = getBGColor()
})

let currentPuppet

let canvas = PIXIApp.view
mainCT.append(canvas)

mainCT.on('click', (evt) => {
  if (currentPuppet && currentPuppet.setViewPoint) {
    // adjust for the fact that the puppet is not the full width
    let left = evt.pageX
    let top = evt.pageY
    currentPuppet.setViewPoint(left, top)
  }
})

PIXIApp.ticker.add(function (delta) {})

let vidStream = canvas.captureStream(60)
let vidTrack = vidStream.getVideoTracks()[0]

let posOriStateDefault = {
  scale: 1,
  y: 0,
  x: 0
}

let posOriState = Object.assign({}, posOriStateDefault)

function posX (val) {
  if (currentPuppet && currentPuppet.adjustTranslate) {
    let newX = val - posOriState.x
    currentPuppet.adjustTranslate(newX, 0)
    posOriState.x = val
  }
}

function posY (val) {
  if (currentPuppet && currentPuppet.adjustTranslate) {
    let newY = val - posOriState.y
    currentPuppet.adjustTranslate(0, newY)
    posOriState.y = val
  }
}

function scale (val) {
  if (currentPuppet && currentPuppet.adjustScale) {
    let newRatio = val / posOriState.scale
    currentPuppet.adjustScale(0.5, -1, newRatio)
    posOriState.scale = val
  }
}

// puppet loading
function loadPuppet (ctx, model) {
  PIXIApp.stage.removeChild(currentPuppet)
  currentPuppet = new PIXI.Live2DSprite(model, {
    modelHomeDir: ctx,
    debugLog: false,
    randomMotion: false,
    eyeBlink: true
  })

  posOriState = Object.assign({}, posOriStateDefault)

  PIXIApp.stage.addChild(currentPuppet)

  currentPuppet.startRandomMotion('idle')

  return currentPuppet
}

export { vidTrack, loadPuppet, scale, posX, posY }
