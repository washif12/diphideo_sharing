const { app, BrowserWindow, screen } = require('electron')

let win;
const basepath = app.getAppPath();

function createWindow () {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  win = new BrowserWindow({
    width, height,
    backgroundColor: '#ffffff',
    icon: `file://${basepath}/dist/web-diphideo-sharing-center/assets/favicon.png`
  })


  win.loadURL(`file://${basepath}/dist/web-diphideo-sharing-center/index.html`)

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})