/* eslint-env node */

import { contextBridge, ipcRenderer } from 'electron'

const electronApi = {
  ipcRenderer
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
