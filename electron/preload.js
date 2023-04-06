/* eslint-env node */

import { contextBridge, ipcRenderer } from 'electron'

const electronApi = {
  sendEvent: event => ipcRenderer.send(event)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronApi)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronApi
}
