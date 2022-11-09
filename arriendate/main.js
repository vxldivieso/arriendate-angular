const { app, BrowserWindow } = require("electron");

let appWin;

createWindow = () => {
    appWin = new BrowserWindow({
        width: 1300,
        height: 768,
        title: "Arriendate.cl",
        resizable: true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        },
    });
    
    appWin.loadURL(`file://${__dirname}/dist/index.html`);

    appWin.on("closed", () => {
        appWin = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
});

