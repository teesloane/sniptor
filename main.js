var ipcMain = require('electron').ipcMain;
var menubar = require('menubar');

var config = {
  title: 'snippets',
  icon: './app/static/img/brackets.png',
  iconAlt: './app/static/img/brackets-alt.png'
};

var mb = menubar({
  dir: './app',
  icon: config.icon,
  width: 600,
  height: 370,
  'always-on-top': true
});

// prevent window resizing
mb.setOption('resizable', false);

// Quit when all windows are closed.
mb.app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    mb.app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
mb.app.on('ready', function() {
  mb.tray.setToolTip(config.title);
  mb.tray.setPressedImage(config.iconAlt);

  ipcMain.on('mb-app', function(event, arg) {
    if (arg === "quit") {
      console.log('goodbye!');
      mb.app.quit();
    }
  });
});
