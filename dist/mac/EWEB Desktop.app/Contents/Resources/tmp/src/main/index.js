/**
 * Main process
 * @exports MainApp (app.js)
 */
const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;
const path = require('path');
const url = require('url');

// Global variables
let winMain;

/**
 * Create the main application window
 * @function
 * @listens ready-to-show close
 */
function createWindow() {
  let iconName = process.platform === 'win32' ? 'icon.png' : 'icons/64x64.png';
  let iconPath = path.join(__dirname, `../assets/${iconName}`);

  // Create main window using state information
  winMain = new BrowserWindow({
    title: 'Test', 
    show: false,
    icon: iconPath
  });

  if(process.env.NODE_ENV === 'development') {
    winMain.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  } else {
    winMain.loadURL(url.format({
      pathname:  path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }));
  }

  // Main window listeners
  winMain.once('ready-to-show', () => {
    winMain.show();
    winMain.focus();
  });

  winMain.on('closed', () => {
    winMain = null;
  });

}

app.on('ready', () => {
  // Create primary window
  createWindow();
});

// Applicaton listeners
app.on('window-all-closed', ()=> {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', ()=> {
  if(winMain === null) {
    createWindow();
  }
});

process.on('unhandledRejection', (reason, p) => {
 console.error(`Unhandled Rejection at: ${util.inspect(p)} reason: ${reason}`);
});
