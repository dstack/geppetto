import $ from 'webpack-zepto'
import { ipcRenderer } from 'electron'
import { getMic } from '../lib/utils'
import { AudioTools } from '../lib/AudioTools'

import { vidTrack, loadPuppet, scale, posY, posX } from '../lib/PuppetVis'

const settings = require('electron-settings')
const conf = require('../../conf/conf')

const Peer = require('peerjs')

let mainStream = new MediaStream()
let micAudioTool = new AudioTools()
let myPeerID = false
if (settings.has('me.peerID')) {
  myPeerID = settings.get('me.peerID')
}

let peer = new Peer(myPeerID, {
  key: conf.PeerServerKey,
  config: conf.PeerConfig
})

peer.on('open', function (id) {
  // make sure that if we override with rand, we are using the correct value
  myPeerID = id
  $('<div/>').css({
    backgroundColor: '#000',
    color: '#fff',
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    padding: '3px',
    fontFamily: 'monospace'
  }).html(`http://curly-rest.surge.sh?pid=${myPeerID}`).appendTo($('body'))
})

peer.on('connection', function (conn) {
  conn.on('open', () => {
    // conn.send({type: 'bgColor', val: '#' + settings.get('me.bgColor')})
    // settings.watch('me.bgColor', (nval) => {
    //   conn.send({type: 'bgColor', val: '#' + settings.get('me.bgColor')})
    // })
  })
  peer.call(conn.peer, mainStream)
})

ipcRenderer.on('load-model', (evt, modelDesc) => {
  let np = loadPuppet(modelDesc.ctx, modelDesc.json)
  np.attachLipSyncAnalyser(micAudioTool.getAnalyser())
})

ipcRenderer.on('pos-ori', (evt, pvPair) => {
  switch (pvPair.prop) {
    case 'scale':
      scale(pvPair.val)
      break
    case 'yPos':
      posY(pvPair.val)
      break
    case 'xPos':
      posX(pvPair.val)
      break
  }
})

// import Vue from 'vue'
// import App from './App'
/*
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
*/
/* eslint-disable no-new */
/*
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
*/

getMic().then((micStream) => {
  // attach the video track
  mainStream.addTrack(vidTrack)
  // attach the mic sound to the stream
  let micTrack = micStream.getAudioTracks()[0]
  micAudioTool.addAudioTrack(micTrack)
  micAudioTool.attachAudioTracksToStream(mainStream)
})
