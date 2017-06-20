let winCache = {
  mainWindow: null,
  posOriWindow: null,
  settingsWindow: null
}

const WIN_NAMES = {
  main: 'mainWindow',
  posOri: 'posOriWindow',
  settings: 'settingsWindow'
}

export { winCache, WIN_NAMES }

export * from './mainWindow'
export * from './posOriWindow'
export * from './settingsWindow'
export * from './animWindow'
export * from './soundBoardWindow'
export * from './mixerWindow'
