import { BrowserWindow } from 'electron'

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

export function mixerWindow (win) {
  win = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  // win.setMenu(null)

  win.loadURL(winURL)

  win.on('closed', () => {
    win = null
  })
}
