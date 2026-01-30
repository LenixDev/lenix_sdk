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
  { label: 'cl_drawfps', boolean: true },
]

export default ({ search }: { search: string | null }) => {
  const [buttonsStates, setButtonsStates] = useState<ButtonStates>(null)
  const [states, setStates] = useState<States>(null)

  const nuiCallbacks = [
    {onClick: () => triggerNuiCallback('disconnect')},
    {onClick: (Key: string, Command: string) => triggerNuiCallback('bind', { Key, Command })},
    {onClick: (Resource: string, Key: string, Command: string) => triggerNuiCallback('resourcebind', { Resource, Key, Command })},
    {onClick: (Key: string, Command: string) => triggerNuiCallback('unbind', { Key, Command })},
    {onClick: () => triggerNuiCallback('drawfps', { State: !states?.cl_drawfps })},
  ] as const  

  const injectedConfig = Config.map((item, index) => (
    { ...item, onClick: nuiCallbacks[index].onClick }
  ))

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
    return <>no items found</>
  }
  return itemsFound
}