const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

// Suppress Electron warning about async responses
process.on("warning", (warning) => {
  if (warning.message && warning.message.includes("message channel closed")) {
    return;
  }
  console.warn(warning);
});

// FIX: DPI/Zoom ổn định trên Windows 125%/150%
app.commandLine.appendSwitch("high-dpi-support", "1");
app.commandLine.appendSwitch("force-device-scale-factor", "1");

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // FIX: khóa zoom factor = 1
  win.webContents.on("did-finish-load", () => {
    win.webContents.setZoomFactor(1);
  });

  // (Optional) debug nếu cần
  win.webContents.on("did-fail-load", (_e, code, desc, url) => {
    console.error("did-fail-load:", { code, desc, url });
  });

  if (isDev) {
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    const indexHtml = path.join(app.getAppPath(), "dist", "index.html");
    win.loadFile(indexHtml);
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
