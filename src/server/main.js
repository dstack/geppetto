import { getQueryParams } from '../lib/utils'

const conf = require('../../conf/conf')
const Peer = require('peerjs')

require('./style.css')

let peerID = getQueryParams().pid

if (!peerID) {
  // prompt for peerID
  peerID = prompt('Connect To: ')
  window.location.href = `http://curly-rest.surge.sh?pid=${peerID}`
} else {
  let vct = document.createElement('video')
  document.querySelector('body').appendChild(vct)

  var peer = new Peer({
    key: conf.PeerServerKey,
    config: conf.PeerConfig
  })

  // var conn = peer.connect(peerID)

  peer.connect(peerID)

  // desktop client not calling the page back fro connection?
  peer.on('connection', function (conn) {
    conn.on('open', () => {
      conn.on('data', (data) => {
        switch (data.type) {
          case 'bgColor':
            document.querySelector('body').style.backgroundColor = data.val
            break
        }
      })
    })
  })

  peer.on('call', function (call) {
    call.answer(null)
    call.on('stream', function (stream) {
      vct.width = 600
      vct.height = 600
      vct.srcObject = stream
      vct.onloadedmetadata = (e) => {
        vct.classList.remove('fade-out')
        vct.classList.add('fade-in')
        vct.play()
      }
    })

    call.on('close', () => {
      vct.classList.remove('fade-in')
      vct.classList.add('fade-out')
    })
  })
}
