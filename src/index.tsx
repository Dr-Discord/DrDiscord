import { localStorage, StorageApi, InternalStorageApi } from "./Storage"
import getModule from "./getModule"
import Modal from "./Modal"
import patch from "./patch"
import i18n from "./i18n"
import {
  React, ReactDOM
} from "./React"

import * as Util from "./Util"
import PanelButton from "./ui/PanelButton"
import MonacoEditor from "./ui/MonacoEditor"
import {
  Themes as ThemesStyling, Plugins as PluginsStyling, Internal as InternalStyling
} from "./stylingApi"

import {
  openSettings
} from "./ui/SettingsModal"

window.$Dr = {
  localStorage, StorageApi, InternalStorageApi, 
  getModule, ReactDOM, React, Modal, patch, Util, 
  i18n, MonacoEditor, openSettingsModal: openSettings
}

window.DrApi = {
  Storage: StorageApi, getModule, ReactDOM, React, Modal, patch, Util, MonacoEditor, styling: PluginsStyling
}

InternalStyling.insert("Dr-Internal-Styling", `.Dr-Settings-TabBar {
  margin-bottom: 10px;
  margin-top: 2px;
  padding: 0;
  flex: unset;
  flex-direction: row;
} .Dr-Settings-TabBar .item-PXvHYJ {
  border-radius: 4px;
  margin: 1px 0 1px 6px;
  padding: 2px 8px;
} .Dr-Settings-TabBar .item-PXvHYJ svg {
  width: 16px;
  height: 16px;
  transform: translateY(2px)
}`)

async function start() {
  const eleOI = Util.getOwnerInstance(await Util.waitFor(".panels-j1Uci_ > .container-3baos1"))
  patch("DrDiscordInternal-Panel-Patch", eleOI.__proto__, "render", (_:any, res:any) => {
    res.props.children[res.props.children.length - 1].props.children.unshift(<PanelButton />)
  })
  eleOI.forceUpdate()
}
start()