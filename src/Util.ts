export const sleep = (time:number) => new Promise((resolve:any) =>
  setTimeout(resolve, time)
)
export const getReactInstance = (element:any) => {
  if (element.__reactInternalInstance$) return element.__reactInternalInstance$
  const ReactKey:any = Object.keys(element).find(k => k.startsWith("__reactInternalInstance") || k.startsWith("__reactFiber"))
  return element[ReactKey] || null
}

export const getOwnerInstance = (element:Node) => {
  const sn = element.__reactFiber$?.return?.stateNode
  if (sn && sn.forceUpdate) return sn
}
export const waitFor = async (querySelector:string) => {
  let elem
  while (!(elem = document.querySelector(querySelector))) await sleep(1)
  return elem
}