import { BrowserWindow } from 'electron'
import { winCache } from './'

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/posOri.html`
  : `file://${__dirname}/posOri.html`

export function posOriWindow (winName) {
  if (winCache[winName]) {
    winCache[winName].show()
    winCache[winName].focus()
    return
  }

  let win = new BrowserWindow({
    height: 200,
    width: 300,
    resize: false
  })

  win.setMenu(null)

  win.loadURL(winURL)

  win.on('closed', () => {
    win = null
    winCache[winName] = null
  })

  winCache[winName] = win
}
