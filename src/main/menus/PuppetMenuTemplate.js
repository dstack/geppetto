import { dialog } from 'electron'

let PuppetMenu = [
  {
    label: 'Puppet',
    submenu: [
      {
        label: 'Load Puppet ...',
        click: () => {
          let laodedCharacter = dialog.showOpenDialog({
            properties: ['openFile'],
            title: 'Open Live2D cahract.json',
            filters: [
              {name: 'Live2D Character JSON', extensions: ['model.json']}
            ]
          })
          console.log(laodedCharacter)
        }
      },
      {
        label: 'Reload Puppet',
        click: () => { console.log('clicked reload puppet') }
      },
      {
        type: 'separator'
      },
      {
        label: 'Position / Orientation',
        click: () => { console.log('clicked reload puppet') }
      },
      {
        type: 'separator'
      },
      {
        type: 'checkbox',
        label: 'Lip Sync',
        checked: true
      },
      {
        type: 'checkbox',
        label: 'Idle Animation',
        checked: true
      }
    ]
  },
  {
    label: 'Settings',
    submenu: [
      {
        label: 'Connection ...',
        click: () => { console.log('clicked connection settings') }
      }
    ]
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

export default PuppetMenu
