export class AudioTools {
  constructor (name) {
    this.name = name
    this.ctx = new AudioContext()
    this.analyser = this.ctx.createAnalyser()

    // this.analyser.minDecibels = -100
    // this.analyser.maxDecibels = -10
    // this.analyser.smoothingTimeConstant = 0.85
    this.analyser.fftSize = 32

    this.gainFilter = this.ctx.createGain()
    this.lastGain = 1
    this.muted = false

    this.inputStream = new MediaStream()
    this.hasStream = false

    this.outputDest = this.ctx.createMediaStreamDestination()

    // wire gain filter to output
    this.gainFilter.connect(this.outputDest)
  }

  getAnalyser () {
    return this.analyser
  }

  getGain () {
    return this.gainFilter.gain.value
  }

  setGain (val) {
    this.gainFilter.gain.value = val
    if (!this.muted) {
      this.lastGain = val
    }
  }

  mute () {
    this.muted = true
    this.setGain(0)
  }

  unmute () {
    this.muted = false
    this.setGain(this.lastGain)
  }

  toggleMute () {
    if (this.muted) {
      this.unmute()
    } else {
      this.mute()
    }
  }

  attachAudioTracksToStream (stream) {
    let tracks = this.outputDest.stream.getAudioTracks()
    tracks.forEach((track) => {
      stream.addTrack(track)
    })
  }

  addAudioTrack (track) {
    if (!this.hasStream) {
      this.hasStream = true
      this.inputStream.addTrack(track)
      this.inputDest = this.ctx.createMediaStreamSource(this.inputStream)

      // wire input to filter, filter to output
      this.inputDest.connect(this.gainFilter)
      this.inputDest.connect(this.analyser)
    }
  }
}
