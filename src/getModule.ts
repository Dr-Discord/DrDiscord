export default (() => {
  if (window.webpackChunkdiscord_app.getModule) return window.webpackChunkdiscord_app.getModule
  else {
    let webpackExports = window.webpackChunkdiscord_app.push([["DrDiscord"], {}, (e:any) => e])
    
    /**
     * @name getModule
     * @param {function || array || string} filter 
     * @param {boolean} first 
     * @returns {module || array || null}
     */
    function getModule(filter:any, first:boolean = true):any {
      let modules = []
      function byPropsAll(...props:Array<string>) {
        const norm = getModule((m: { [x: string]: any }) => props.every((prop) => typeof m[prop] !== "undefined"), false)
        let def = []
        for (const module of getModule((m: { default: { [x: string]: any } }) => props.every((prop) => typeof m.default?.[prop] !== "undefined"), false)) 
          def.push(module.default)
        return [...norm, ...def]
      }
      function byDisplayName(displayName:string) {
        const norm = getModule((m: { default: { displayName: string } }) => m.default?.displayName === displayName, false)
        const type = getModule((m: { default: { type: { displayName: string } } }) => m.default?.type?.displayName === displayName, false)
        const rend = getModule((m: { default: { type: { render: { displayName: string } } } }) => m.default?.type?.render?.displayName === displayName, false)
        return [...norm, ...type, ...rend]
      }
      if (Array.isArray(filter)) modules = byPropsAll(...filter)
      else if (typeof filter === "string") modules = byDisplayName(filter)
      else if (typeof filter === "function") {
        for(let ite in webpackExports.c) {
          if(!Object.hasOwnProperty.call(webpackExports.c, ite)) return
          let ele = webpackExports.c[ite].exports
          if(!ele) continue
          if(filter(ele)) modules.push(ele)
        }
      }
      if (first) return modules[0]
      return modules
    }
    
    Object.assign(getModule, {
      webpackExports,
      id: (num:string) => webpackExports.c[num],
      getId: (mod:any) => {
        let toReturn
        for (let cs in webpackExports.c)
          if (webpackExports.c[cs].exports === mod) 
            toReturn = cs
        return toReturn
      }
    })
  
    window.webpackChunkdiscord_app.getModule = getModule
  
    return getModule
  }
})()