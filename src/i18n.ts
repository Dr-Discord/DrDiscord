export const languages:any = {
  global: {
    name: "Discord Re-envisioned"
  },
  en: {
    settings: "Settings",
    misc: "Misc"
  }
}

const i18n = new Proxy(languages[navigator.language.split("-", 1)[0]], {
  get: (target, key:string) => {
    const lang = navigator.language.split("-", 1)[0]
    return languages.global[key] || languages[lang][key] || languages.en[key] || key
  }
})

export default i18n