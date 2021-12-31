const { join } = require("path")
const electron = require("electron")
const Module = require("module")

electron.app.commandLine.appendSwitch("no-force-async-hooks-checks")

process.env.DRDISCORD_DIR = __dirname

class BrowserWindow extends electron.BrowserWindow {
  constructor(opt) {
    if (opt.title != "Discord") return super(opt)
    
    const win = new electron.BrowserWindow(opt)
    
    win.webContents.executeJavaScript(`(${async () => {
      // Remove devtools callbacks
      await DiscordNative.window.setDevtoolsCallbacks(null, null)
      // Add requirejs for monaco
      await fetch("https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.js").then(e => e.text()).then(eval)
      window.MonacoEnvironment = {
        getWorkerUrl: function (workerId, label) {
          return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
            self.MonacoEnvironment = {
              baseUrl: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.16.2/min/"
            };
            importScripts("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.16.2/min/vs/base/worker/workerMain.js");`
          )}`
        }
      }
      requirejs.config({paths: {"vs": "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.16.2/min/vs"}})
      requirejs(["vs/editor/editor.main"], function () {})
    }})()`)

    win.webContents.on("did-finish-load", () => {
      win.webContents.executeJavaScript(`(${async () => {
        try {
          const js = await fetch("http://127.0.0.1:5500/build/index.js").then(e => e.text())
          eval(js)
        } catch (e) { console.error("DrDiscord Start ERR \n\n", e) }
      }})()`)
    })
    
    return win
  }
}

electron.app.once("ready", () => {
  electron.session.defaultSession.webRequest.onHeadersReceived(function({ responseHeaders }, callback) {
    delete responseHeaders["content-security-policy-report-only"]
    delete responseHeaders["content-security-policy"]
    
    callback({ 
      cancel: false, 
      responseHeaders
    })
  })
})

const Electron = new Proxy(electron, { get: (target, prop) => prop === "BrowserWindow" ? BrowserWindow : target[prop] })

const electronPath = require.resolve("electron")
delete require.cache[electronPath].exports
require.cache[electronPath].exports = Electron

const basePath = join(process.resourcesPath, "app.asar")
const pkg = require(join(basePath, "package.json"))
electron.app.setAppPath(basePath)
electron.app.name = pkg.name
Module._load(join(basePath, pkg.main), null, true)