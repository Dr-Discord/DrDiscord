function getLocalStorage() {
  if (window.localStorage) return window.localStorage
  if (window.$Dr?.localStorage) return window.$Dr.localStorage
  const frame = document.createElement("frame")
  frame.src = "about:blank"
  document.body.appendChild(frame)
  let localStorage:any = Object.getOwnPropertyDescriptor(frame.contentWindow, "localStorage")
  frame.remove()
  Object.defineProperty(window, "localStorage", localStorage)
  localStorage = window.localStorage
  delete window.localStorage
  return localStorage
}

export const localStorage = getLocalStorage()

const storage = new class {
  pluginStorage: any
  internalStorage: any
  constructor() {
    this.pluginStorage = (JSON.parse(localStorage.getItem("DrPluginStorage")) || {})
    this.internalStorage = (JSON.parse(localStorage.getItem("DrInternalStorage")) || {})
  }
  getInternalData(key:string, defVal:any = null) {
    let data = this.internalStorage[key]
    return data === undefined ? defVal : data
  }
  setInternalData(key:string, value:any) {
    const data = this.internalStorage
    data[key] = value
    localStorage.setItem("DrInternalStorage", JSON.stringify(data))
  }
  deleteInternalData(key:string) {
    const data = this.internalStorage
    if (!data[key]) return
    delete data[key]
    localStorage.setItem("DrInternalStorage", JSON.stringify(data))
  }

  getData(plugin:string, key:string, defVal:any = null) {
    let data = this.pluginStorage[plugin]?.[key]
    return data === null ? defVal : data
  }
  getAllData(plugin:string) {
    return this.pluginStorage[plugin]
  }
  setData(plugin:string, key:string, value:any) {
    let data = this.pluginStorage[plugin]
    if (!data) data = this.pluginStorage[plugin] = {}
    data[key] = value
    this.pluginStorage[plugin] = data
    localStorage.setItem("DrPluginStorage", JSON.stringify(this.pluginStorage))
  }
  deleteData(plugin:string, key:string) {
    const data = this.pluginStorage[plugin]
    if (!data) return
    delete data[key]
    this.pluginStorage[plugin] = data
    localStorage.setItem("DrPluginStorage", JSON.stringify(this.pluginStorage))
  }
}

export const InternalStorageApi = {
  getData: (key:string, defVal:any = null) => storage.getInternalData(key, defVal),
  setData: (key:string, value:any) => storage.setInternalData(key, value),
  deleteData: (key:string) => storage.deleteInternalData(key),
}

export const StorageApi = {
  getData: (plugin:string, key:string, defVal:any = null) => storage.getData(plugin, key, defVal),
  getAllData: (plugin:string) => storage.getAllData(plugin),
  setData: (plugin:string, key:string, value:any) => storage.setData(plugin, key, value),
  deleteData: (plugin:string, key:string) => storage.deleteData(plugin, key)
}