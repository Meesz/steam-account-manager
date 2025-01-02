const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  saveAccount: async (account) => {
    return await ipcRenderer.invoke("save-account", account);
  },
});
