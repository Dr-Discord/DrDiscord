const { join } = require("path")
const electron = require("electron")
const Module = require("module")

electron.app.commandLine.appendSwitch("no-force-async-hooks-checks")

process.env.DRDISCORD_DIR = __dirname

class BrowserWindow extends electron.BrowserWindow {
  constructor(opt) {
    if (opt.title != "Discord") return super(opt)
    
    const win = new electron.BrowserWindow(opt)

    
    win.webContents.on("did-finish-load", () => {
      win.webContents.executeJavaScript(`(${async () => {
        await DiscordNative.window.setDevtoolsCallbacks(null, null)
        try {
          const js = await fetch("http://127.0.0.1:5500/build/index.js").then(e => e.text())
          eval(js)
        } catch (e) { console.error("DrDiscord Start ERR \n\n", e) }
      }})()`)
    })
    win.webContents.on("dom-ready", () => {
      win.webContents
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