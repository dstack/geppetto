import { BrowserWindow } from 'electron'
import { winCache } from './'

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/settings.html`
  : `file://${__dirname}/settings.html`

export function settingsWindow (winName) {
  if (winCache[winName]) {
    winCache[winName].show()
    winCache[winName].focus()
    return
  }

  let win = new BrowserWindow({
    height: 600,
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
