"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Storage_1 = require("./Storage");
const getModule_1 = __importDefault(require("./getModule"));
const Modal_1 = __importDefault(require("./Modal"));
const patch_1 = __importDefault(require("./patch"));
const React_1 = require("./React");
const Util = __importStar(require("./Util"));
const PanelButton_1 = __importDefault(require("./ui/PanelButton"));
window.$Dr = {
    localStorage: Storage_1.localStorage, StorageApi: Storage_1.StorageApi, InternalStorageApi: Storage_1.InternalStorageApi, getModule: getModule_1.default, ReactDOM: React_1.ReactDOM, React: React_1.React, Modal: Modal_1.default, patch: patch_1.default, Util
};
window.DrApi = {
    Storage: Storage_1.StorageApi, getModule: getModule_1.default, ReactDOM: React_1.ReactDOM, React: React_1.React, Modal: Modal_1.default, patch: patch_1.default, Util
};
async function start() {
    const eleOI = Util.getOwnerInstance(await Util.waitFor(".panels-j1Uci_ > .container-3baos1"));
    (0, patch_1.default)("DrDiscordInternal-Panel-Patch", eleOI.__proto__, "render", (_, res) => {
        res.props.children[res.props.children.length - 1].props.children.unshift(React_1.React.createElement(PanelButton_1.default, null));
    });
    eleOI.forceUpdate();
}
start();
