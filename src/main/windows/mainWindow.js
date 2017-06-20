import { BrowserWindow, Menu, dialog, app } from 'electron'
import { winCache, WIN_NAMES, posOriWindow, settingsWindow } from './'

const fs = require('fs')
const path = require('path')

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/index.html`
  : `file://${__dirname}/index.html`

let lastPuppet

export function mainWindow (winName) {
  // create window object
  let win = new BrowserWindow({
    height: 600,
    width: 600,
    resizable: false,
    useContentSize: true,
    webPreferences: {
      webSecurity: false
    }
  })

  function loadPuppetFromFile (fileName) {
    let ctx = path.parse(fileName).dir + '/'
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        console.error(err)
      } else {
        let jsonModel = {}
        try {
          jsonModel = JSON.parse(data)
        } catch (parseError) {
          console.error(parseError)
          jsonModel = {}
        }
        win.webContents.send('load-model', {ctx: ctx, json: jsonModel})
      }
    })
  }

  // create menu
  let PuppetMenu = [
    {
      label: 'Puppet',
      submenu: [
        {
          label: 'Load Puppet ...',
          click: () => {
            dialog.showOpenDialog({
              properties: ['openFile'],
              title: 'Open Live2D cahract.json',
              filters: [
                {name: 'Live2D Character JSON', extensions: ['model.json']}
              ]
            }, (fileNames) => {
              // go grab the JSON, load it up and use the file location as the context for loading subsequent
              if (fileNames && fileNames.length > 0) {
                let fileName = fileNames[0]
                lastPuppet = fileName
                loadPuppetFromFile(fileName)
              }
            })
          }
        },
        {
          label: 'Reload Puppet',
          click: () => {
            if (lastPuppet) {
              loadPuppetFromFile(lastPuppet)
            }
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Position / Orientation',
          click: () => {
            posOriWindow(WIN_NAMES.posOri)
          }
        },
        {
          type: 'separator'
        },
        {
          type: 'checkbox',
          enabled: false,
          label: 'Lip Sync',
          checked: true
        },
        {
          type: 'checkbox',
          enabled: false,
          label: 'Idle Animation',
          checked: true
        }
      ]
    },
    {
      label: 'Settings',
      click: () => {
        settingsWindow(WIN_NAMES.settings)
      }
    },
    {
      label: 'Animations',
      click: () => { console.log('open animations controls') }
    },
    {
      label: 'Soundboard',
      click: () => { console.log('open soundboard controls') }
    }
  ]

  let mainMenu = Menu.buildFromTemplate(PuppetMenu)

  win.setMenu(mainMenu)

  win.loadURL(winURL)

  win.on('closed', () => {
    win = null
    winCache[winName] = null
    app.quit()
  })

  winCache[winName] = win
}
