let DrHead = document.createElement("Dr-Head")
document.head.appendChild(DrHead)

let DrThemes = document.createElement("Dr-Themes")
let DrPlugins = document.createElement("Dr-Plugins")
let DrInternal = document.createElement("Dr-Internal")

DrHead.append(DrInternal, DrPlugins, DrThemes)

export const Themes = {
  insert: (id:string, content:string):Function => {
    const Style = Object.assign(document.createElement("style"), {
      type: "text/css",
      id, innerHTML: content
    })
    DrThemes.appendChild(Style)
    return () => Style.remove()
  },
  clear: (id:string):void => {
    const Style = document.getElementById(id)
    if (Style) Style.remove()
  }
}

export const Plugins = {
  insert: (id:string, content:string):Function => {
    const Style = Object.assign(document.createElement("style"), {
      type: "text/css",
      id, innerHTML: content
    })
    DrPlugins.appendChild(Style)
    return () => Style.remove()
  },
  clear: (id:string):void => {
    const Style = document.getElementById(id)
    if (Style) Style.remove()
  }
}

export const Internal = {
  insert: (id:string, content:string):Function => {
    const Style = Object.assign(document.createElement("style"), {
      type: "text/css",
      id, innerHTML: content
    })
    DrInternal.appendChild(Style)
    return () => Style.remove()
  },
  clear: (id:string):void => {
    const Style = document.getElementById(id)
    if (Style) Style.remove()
  }
}