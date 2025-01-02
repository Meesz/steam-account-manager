const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  saveAccount: async (account) => {
    return await ipcRenderer.invoke("save-account", account);
  },
  getAccounts: async () => {
    return await ipcRenderer.invoke("get-accounts");
  },
  navigateToAccounts: () => {
    ipcRenderer.send("navigate-to-accounts");
  },
  navigateToMain: () => {
    ipcRenderer.send("navigate-to-main");
  },
});
