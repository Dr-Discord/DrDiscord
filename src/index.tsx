import { localStorage, StorageApi, InternalStorageApi } from "./Storage"
import getModule from "./getModule"
import Modal from "./Modal"
import patch from "./patch"
import {
  React, ReactDOM
} from "./React"

import * as Util from "./Util"

import PanelButton from "./ui/PanelButton"

import i18n from "./i18n"

import MonacoEditor from "./ui/MonacoEditor"

window.$Dr = {
  localStorage, StorageApi, InternalStorageApi, getModule, ReactDOM, React, Modal, patch, Util, i18n, MonacoEditor
}

window.DrApi = {
  Storage: StorageApi, getModule, ReactDOM, React, Modal, patch, Util, MonacoEditor
}

async function start() {
  const eleOI = Util.getOwnerInstance(await Util.waitFor(".panels-j1Uci_ > .container-3baos1"))
  patch("DrDiscordInternal-Panel-Patch", eleOI.__proto__, "render", (_:any, res:any) => {
    res.props.children[res.props.children.length - 1].props.children.unshift(<PanelButton />)
  })
  eleOI.forceUpdate()
}
start()