import { React } from "../React"
import getModule from "../getModule"
import Modal from "../Modal"
import i18n from "../i18n"
import * as Icons from "./Icons"

function byDisplayName(displayName:string) { return getModule(displayName)?.default }

const {
  openModal, elements: MEs
} = Modal

const Flex = byDisplayName("Flex")
const Text = byDisplayName("Text")
const FormTitle = byDisplayName("FormTitle")
const TabBar = byDisplayName("TabBar")
const SwitchItem = byDisplayName("SwitchItem")

const Tabs = React.memo((props:any) => {
  const { page, setPage } = props

  return (
    <TabBar
      selectedItem={page}
      onItemSelect={(e:number) => {
        setPage(e)
      }}
      className="Dr-Settings-TabBar"
    >
      <TabBar.Item id={0}><Icons.Settings /></TabBar.Item>
      <TabBar.Item id={1}><Icons.Themes /></TabBar.Item>
      <TabBar.Item id={2}><Icons.Plugins /></TabBar.Item>
    </TabBar>
  )
})

const Collapsable = React.memo((props:any) => {
  const { title, children } = props

  const [isOpen, setOpen] = React.useState(false)

  const ref = React.useRef()
  React.useEffect(() => {
    // @ts-expect-error
    window.ref = ref.current
    ref.offsetHeight
  })
  
  return (
    <div className={`Dr-Settings-Collapsable${isOpen ? " Open" : ""}`}>
      <div className="Dr-Settings-Collapsable-Title-Wrapper" onClick={() => {
        setOpen(!isOpen)
      }}>
        <Text className="Dr-Settings-Collapsable-Title">{title}</Text>
      </div>
      <div className="Dr-Settings-Collapsable-Children-Wrapper" style={{
          height: isOpen ? "auto" : 0,
          overflow: "hidden"
        }}>
        <div className="Dr-Settings-Collapsable-Children" ref={ref}>{children}</div>
      </div>
    </div>
  )
})

const General = React.memo((props:any) => {
  const [isDeveloper, setIsDeveloper] = React.useState($Dr.isDeveloper)

  return (
    <>
      <Collapsable title="General">
        <SwitchItem
          note={i18n.banWarnNote}
          value={isDeveloper}
          onChange={(e:boolean) => {
            setIsDeveloper(e)
            $Dr.isDeveloper = e
          }}
        >{i18n.enDevMode}</SwitchItem>
      </Collapsable>
    </>
  )
})

const SettingsPage = React.memo((props:any) => {
  const { mProps, PAGE, reactElement } = props

  const [page, setPage] = React.useState(PAGE)

  return (
    <MEs.ModalRoot
      {...mProps}
      className="Dr-Settings-Modal"
      size={MEs.ModalSize.LARGE}
    >
      <MEs.ModalHeader separator={false}>
        <Flex>
          <Flex.Child>
            <Flex.Child>
              <FormTitle
                tag="h4"
              >{i18n.name}</FormTitle>
              </Flex.Child>
                <Text>v{i18n.vers}</Text>
              <Flex.Child>
            </Flex.Child>
          </Flex.Child>
          <Flex.Child>
            <Tabs page={page} setPage={setPage} />
          </Flex.Child>
          <Flex.Child>
            <MEs.ModalCloseButton onClick={mProps.onClose} />
          </Flex.Child>
        </Flex>
      </MEs.ModalHeader>
      <MEs.ModalContent>
        {page == 0 ? <General /> : page == 1 ? "1" : page == 2 ? "2" : "3"}
      </MEs.ModalContent>
    </MEs.ModalRoot>
  )
})

export const openSettings = (PAGE:number = 0, reactElement?:any) => openModal((mProps:any) => <SettingsPage mProps={mProps} PAGE={PAGE} reactElement={reactElement} />)

export default SettingsPage