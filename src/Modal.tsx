import getModule from "./getModule"
import { React } from "./React"

const Markdown = getModule((m:any) => m.default?.displayName === "Markdown" && m.default.rules).default
const { Messages } = getModule(["Messages"], false)[1]
const ConfirmationModal = getModule("ConfirmModal").default
const Button = getModule(["ButtonColors"])
const {
  openModal, closeModal, closeAllModals
} = getModule(["openModal", "openModalLazy"])
const TextInput = getModule("TextInput").default
const { SingleSelect } = getModule(["SingleSelect"])
const TextArea = getModule("TextArea").default

export default {
  openModal, closeModal, closeAllModals,
  elements: getModule(["ModalRoot"]),
  /**
   * @name prompt
   * @param {string} title 
   * @param {object} opts 
   * @returns {string || null} 
   */
  prompt: async (title:string, opts:any = {}):Promise<string | null> => {
    const { defaultValue = "", type = "input", options = [], ...other } = opts
    let toReturn = defaultValue
    return new Promise((resolve) => {
      openModal((props:any) => {
        if (props.transitionState === 2) resolve(null)
        return (
          <ConfirmationModal
            header={title}
            confirmButtonColor={Button.ButtonColors.BRAND}
            confirmText={Messages.OKAY}
            cancelText={Messages.CANCEL}
            onConfirm={() => resolve(toReturn)}
            onCancel={() => resolve(null)}
            {...props}
          >
            {
              React.createElement(React.memo(() => {
                const [value, setValue] = React.useState(defaultValue)
                if (type.toLowerCase() === "input") return (
                  <TextInput 
                    {...other}
                    value={value}
                    onInput={(ele:any) => {
                      setValue(ele.target.value)
                      toReturn = ele.target.value
                    }}
                  />
                )
                if (type.toLowerCase() === "textarea") return (
                  <TextArea 
                    {...other}
                    value={value}
                    onChange={(val:any) => {
                      setValue(val)
                      toReturn = val
                    }}
                  />
                )
                if (type.toLowerCase() === "dropdown") return (
                  <SingleSelect 
                    {...other}
                    value={value}
                    options={options}
                    onChange={(val:any) => {
                      setValue(val)
                      toReturn = val
                    }}
                  />
                )
              }))
            }
          </ConfirmationModal>
        )
      })
    })
  },
  /**
   * @name showConfirmationModal
   * @param {string} title 
   * @param {string || array} content 
   * @param {object} options 
   * @returns {string} modal key
   */
  showConfirmationModal: (title:string, content:Array<any>, options:any = {}):string => {
    const emptyFunction = () => {}
    const { 
      onConfirm = emptyFunction, onCancel = emptyFunction, 
      confirmText = Messages.OKAY, cancelText = Messages.CANCEL, 
      danger = false, key = undefined
    } = options
    if (!Array.isArray(content)) content = [content]
    content = content.map(c => typeof(c) === "string" ? React.createElement(Markdown, null, c) : c)
    return openModal((props:any) => {
      return (
        <ConfirmationModal
          header={title}
          confirmButtonColor={danger ? Button.ButtonColors.DANGER : Button.ButtonColors.BRAND}
          confirmText={confirmText}
          cancelText={cancelText}
          onConfirm={onConfirm}
          onCancel={onCancel}
          {...props}
        >{content}</ConfirmationModal>
      )
    }, {modalKey: key})
  }
}