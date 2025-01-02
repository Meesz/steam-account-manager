const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs").promises;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "renderer/index.html"));
}

app.on("ready", () => {
  createWindow();
});

ipcMain.handle("save-account", async (event, account) => {
  const filePath = path.join(__dirname, "accounts.json");
  let accounts = [];

  try {
    try {
      const data = await fs.readFile(filePath, "utf8");
      if (data.trim()) {
        accounts = JSON.parse(data);
      }
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }

    accounts.push(account);
    await fs.writeFile(filePath, JSON.stringify(accounts, null, 2));
    return { success: true };
  } catch (error) {
    console.error("Error saving account:", error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle("get-accounts", async () => {
  try {
    const accountsPath = path.join(__dirname, "accounts.json");
    const data = await fs.readFile(accountsPath, "utf8");
    if (!data.trim()) {
      return [];
    }
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      // If file doesn't exist, create it with empty array
      await fs.writeFile(accountsPath, JSON.stringify([], null, 2));
      return [];
    }
    throw error;
  }
});

// Add these IPC handlers for navigation
ipcMain.on("navigate-to-accounts", () => {
  mainWindow.loadFile(path.join(__dirname, "renderer/accounts.html"));
});

ipcMain.on("navigate-to-main", () => {
  mainWindow.loadFile(path.join(__dirname, "renderer/index.html"));
});
