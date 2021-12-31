"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageApi = exports.InternalStorageApi = exports.localStorage = void 0;
function getLocalStorage() {
    if (window.localStorage)
        return window.localStorage;
    if (window.$Dr?.localStorage)
        return window.$Dr.localStorage;
    const frame = document.createElement("frame");
    frame.src = "about:blank";
    document.body.appendChild(frame);
    let localStorage = Object.getOwnPropertyDescriptor(frame.contentWindow, "localStorage");
    frame.remove();
    Object.defineProperty(window, "localStorage", localStorage);
    localStorage = window.localStorage;
    delete window.localStorage;
    return localStorage;
}
exports.localStorage = getLocalStorage();
const storage = new class {
    pluginStorage;
    internalStorage;
    constructor() {
        this.pluginStorage = (exports.localStorage.getItem("DrPluginStorage") || {});
        this.internalStorage = (exports.localStorage.getItem("DrInternalStorage") || {});
    }
    getInternalData(key, defVal = null) {
        let data = this.internalStorage[key];
        return data === null ? defVal : data;
    }
    setInternalData(key, value) {
        const data = this.internalStorage;
        data[key] = value;
        exports.localStorage.setItem("DrInternalStorage", JSON.stringify(data));
    }
    deleteInternalData(key) {
        const data = this.internalStorage;
        if (!data[key])
            return;
        delete data[key];
        exports.localStorage.setItem("DrInternalStorage", JSON.stringify(data));
    }
    getData(plugin, key, defVal = null) {
        let data = this.pluginStorage[plugin]?.[key];
        return data === null ? defVal : data;
    }
    getAllData(plugin) {
        return this.pluginStorage[plugin];
    }
    setData(plugin, key, value) {
        let data = this.pluginStorage[plugin];
        if (!data)
            data = this.pluginStorage[plugin] = {};
        data[key] = value;
        this.pluginStorage[plugin] = data;
        exports.localStorage.setItem("DrPluginStorage", JSON.stringify(this.pluginStorage));
    }
    deleteData(plugin, key) {
        const data = this.pluginStorage[plugin];
        if (!data)
            return;
        delete data[key];
        this.pluginStorage[plugin] = data;
        exports.localStorage.setItem("DrPluginStorage", JSON.stringify(this.pluginStorage));
    }
};
exports.InternalStorageApi = {
    getData: (key, defVal = null) => storage.getInternalData(key, defVal),
    setData: (key, value) => storage.setInternalData(key, value),
    deleteData: (key) => storage.deleteInternalData(key),
};
exports.StorageApi = {
    getData: (plugin, key, defVal = null) => storage.getData(plugin, key, defVal),
    getAllData: (plugin) => storage.getAllData(plugin),
    setData: (plugin, key, value) => storage.setData(plugin, key, value),
    deleteData: (plugin, key) => storage.deleteData(plugin, key)
};
