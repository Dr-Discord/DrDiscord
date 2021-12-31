import { React } from "../React"

export class MonacoEditor extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = { error: false }
    this.myRef = React.createRef()
  }
  
  componentDidMount() {
    const propKeys = Object.keys(this.props).filter(key => key !== "didMount")
    const props:any = {}
    for (const propKey of propKeys) props[propKey] = this.props[propKey]
    this.editor = window.monaco.editor.create(this.myRef.current, props)
    this.props.didMount?.(this.editor)
  }

  render() {
    return <div ref={this.myRef} style={{ width: "100%",  height: "100%" }}/>
  }
}

export default MonacoEditor