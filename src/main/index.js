'use strict'

import { app, ipcMain } from 'electron'
import { winCache, WIN_NAMES, mainWindow } from './windows'
// const settings = require('electron-settings')

const mainWinName = WIN_NAMES.main

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static')
}

ipcMain.on('play-sound', (sound) => {})
ipcMain.on('play-anim', (anim) => {})

ipcMain.on('pos-ori', (evt, pvPair) => {
  if (winCache[mainWinName]) {
    winCache[mainWinName].webContents.send('pos-ori', pvPair)
  }
})

function createMainWindow () {
  mainWindow(mainWinName)
}

app.on('ready', createMainWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (winCache[mainWinName] === null) {
    createMainWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
