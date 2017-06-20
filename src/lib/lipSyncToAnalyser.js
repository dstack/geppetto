const PIXI = require('pixi.js')
require('pixi-live2d/src/index')

PIXI.Live2DSprite.prototype.attachLipSyncAnalyser = function (analyser) {
  let model = this.model
  let bufferLength = analyser.frequencyBinCount
  let cache = []
  let lastTime = Date.now()
  setInterval(() => {
    const dataArray = new Uint8Array(bufferLength)
    analyser.getByteFrequencyData(dataArray)
    const value = (dataArray[9] + dataArray[10] + dataArray[11]) / 3
    if (Date.now() - lastTime < 33) {
      cache.push(value)
    } else {
      let lipValue = 0
      if (cache.length) {
        let reduced = cache.reduce((prev, current) => {
          let nv = current += prev
          return nv
        })
        lipValue = reduced / cache.length / 100
      } else {
        lipValue = model.lipSyncValue
      }

      model.lipSync = true
      model.lipSyncValue = lipValue
      lastTime = Date.now()
      cache = []
    }
  }, 0)
}
