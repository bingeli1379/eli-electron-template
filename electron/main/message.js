import { BrowserWindow, ipcMain, dialog } from 'electron'

ipcMain.on('showMessageBox', (e, message) => {
  const messageWindow = new BrowserWindow({ show: false, alwaysOnTop: true })

  dialog
    .showMessageBox(messageWindow, {
      type: 'info',
      title: 'Message',
      message: message
    })
    .then(() => {
      messageWindow.destroy()
    })
})
