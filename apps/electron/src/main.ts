import { app, BrowserWindow, nativeTheme, Menu } from "electron";
import path from "path";
import url from "url";

const isDev = process.env.NODE_ENV !== "production";

function createMenuTemplate() {
  return [
    {
      label: 'File',
      submenu: [
        {
          label: 'New Product',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            // Will be handled by renderer process
            const focusedWindow = BrowserWindow.getFocusedWindow();
            focusedWindow?.webContents.send('menu-new-product');
          }
        },
        {
          label: 'New Category',
          click: () => {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            focusedWindow?.webContents.send('menu-new-category');
          }
        },
        { type: 'separator' },
        {
          label: 'Print Receipt',
          accelerator: 'CmdOrCtrl+P',
          click: () => {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            focusedWindow?.webContents.print();
          }
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: 'Alt+F4',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About CodePharma',
          click: () => {
            const focusedWindow = BrowserWindow.getFocusedWindow();
            focusedWindow?.webContents.send('menu-about');
          }
        },
        {
          label: 'Documentation',
          click: () => {
            require('electron').shell.openExternal('https://github.com/codepharma/docs');
          }
        },
        { type: 'separator' },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'F12',
          click: (item, focusedWindow) => {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools();
          }
        }
      ]
    }
  ] as Electron.MenuItemConstructorOptions[];
}

function createWindow() {
  // Set custom menu
  const menu = Menu.buildFromTemplate(createMenuTemplate());
  Menu.setApplicationMenu(menu);

  const win = new BrowserWindow({
    width: 1280,
    height: 900,
    title: "CodePharma POS",
    backgroundColor: "#e8e4d9",
    titleBarOverlay: {
      color: "#1a5f3f",
      symbolColor: "#e8e4d9",
      height: 34
    },
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  if (isDev) {
    const devUrl = process.env.DEV_SERVER_URL || "http://localhost:5173";
    win.loadURL(devUrl);
  } else {
    const indexPath = url.format({
      // In production, load built web assets from apps/web/dist
      pathname: path.join(__dirname, "..", "..", "web", "dist", "index.html"),
      protocol: "file",
      slashes: true
    });
    win.loadURL(indexPath);
  }
}

app.whenReady().then(() => {
  nativeTheme.themeSource = "light";
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
