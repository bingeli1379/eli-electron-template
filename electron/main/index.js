/* eslint-env node */

import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

import './message'

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

const isDevelopment = process.env.NODE_ENV === 'development'

app.whenReady().then(async () => {
  // devtools
  if (isDevelopment) {
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  createWindow()

  // macOS
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

async function createWindow() {
  const mainWindow = new BrowserWindow({
    icon: join(__dirname, '../../public/favicon.ico'),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js')
    }
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    if (isDevelopment) mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../../dist/index.html'))
  }
}

// macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
