const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs").promises;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "renderer/index.html"));
});

ipcMain.handle("save-account", async (event, account) => {
  const filePath = path.join(__dirname, "accounts.json");
  let accounts = [];

  try {
    // Read existing accounts
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      // Only try to parse if the file has content
      if (data.trim()) {
        accounts = JSON.parse(data);
      }
    } else {
      // Create the file with an empty array if it doesn't exist
      fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    }

    // Add the new account
    accounts.push(account);

    // Save back to file
    fs.writeFileSync(filePath, JSON.stringify(accounts, null, 2));

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
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      // If file doesn't exist, return empty array
      return [];
    }
    throw error;
  }
});
