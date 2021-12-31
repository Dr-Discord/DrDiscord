import { React } from "../React"

export default React.memo((prop:any) => {
  const ref = React.useRef()
  React.useEffect(() => {
    const propKeys = Object.keys(prop).filter(key => key !== "didMount")
    const props:any = {}
    for (const propKey of propKeys) props[propKey] = props[propKey]
    const editor = window.monaco.editor.create(ref.current, props)
    props.didMount?.(editor)
  })

  return <div ref={ref} style={{ width: "100%",  height: "100%" }}/>
})