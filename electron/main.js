/* eslint-env node */

import { app, BrowserWindow } from 'electron'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

const isDevelopment = process.env.NODE_ENV === 'development'

app.whenReady().then(async () => {
  if (isDevelopment) {
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  const win = new BrowserWindow({
    title: 'Electron Template'
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    win.loadFile('dist/index.html')
  }
})
