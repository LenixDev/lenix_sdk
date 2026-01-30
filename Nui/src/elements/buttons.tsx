import { useState } from "react"
import { triggerNuiCallback } from "@trippler/tr_lib/nui"
import type { ButtonStates, States } from "."
import Button from "./button"
import Dropdown from "./dropdown"

const Config = [
  { label: 'Disconnect' },
  { label: 'Bind', args: [
      { placeholder: 'The keyboard bind to use', required: true },
      { placeholder: 'The command to trigger', required: true }
    ]
  },
  { label: 'Resource Bind', args: [
      { placeholder: 'The keyboard bind to use only when that resource is started', required: true },
      { placeholder: 'The keyboard bind to use', required: true },
      { placeholder: 'The command to trigger', required: true }
    ]
  },
  { label: 'Unbind', args: [ { placeholder: 'The keyboard bind to unbind', required: true } ] },
  { label: 'Toggle Fps', boolean: true },
  { label: 'Toggle Performance', boolean: true },
  { label: 'Quit' },
]



export default ({ search }: { search: string | null }) => {
  const [buttonsStates, setButtonsStates] = useState<ButtonStates>(null)
  const [states, setStates] = useState<States>(null)
  function toggleState(..._args: any[]) {
    setStates({ ...states, [arguments[0]]: !states?.[arguments[0]] })
    return !states?.[arguments[0]]
  }

  const nuiCallbacks = [
    {onClick: () => triggerNuiCallback('disconnect')},
    {onClick: (Key: string, Command: string) => triggerNuiCallback('bind', { Key, Command })},
    {onClick: (Resource: string, Key: string, Command: string) => triggerNuiCallback('resourcebind', { Resource, Key, Command })},
    {onClick: (Key: string, Command: string) => triggerNuiCallback('unbind', { Key, Command })},
    {onClick: () => triggerNuiCallback('drawfps', { State: toggleState("drawfps") })},
    {onClick: () => triggerNuiCallback('drawperf', { State: toggleState("drawperf") })},
  ] as const  

  const injectedConfig = Config.map((item, index) => {
    const onNuiClick = nuiCallbacks[index]?.onClick
    if (!onNuiClick) throw new Error(`No NUI callback found for ${item.label}`)
    return (
      { ...item, onClick: onNuiClick }
    )
  })

  const filteredFeatures = injectedConfig.filter(({ label }) => 
    !search || label.toLowerCase().includes(search.toLowerCase())
  )

  const itemsFound = filteredFeatures.map(feature => {
    if (!feature.args) {
      return <Button key={feature.label} {...feature} />
    } else {
      return <Dropdown key={feature.label} {...feature} {...{ buttonsStates, setButtonsStates}} />
    }
  })
  if (!itemsFound.length) {
    return <div className="text-black">no items found</div>
  }
  return itemsFound
}