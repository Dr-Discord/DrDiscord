interface Window {
  $Dr:any
  DrApi:any
  webpackChunkdiscord_app:any
  setImmediate:Function
  localStorage:any
  MonacoEnvironment:any
  monaco:any
}

interface Node {
  __reactFiber$?:any
  __reactInternalInstance$?:any
}

declare const DrApi:any
declare const $Dr:any

declare function setImmediate(fun:Function, ...args?:Array<any>):number
declare function requirejs(deps:Array<string>, callback:Function, errback:Function, optional:any)