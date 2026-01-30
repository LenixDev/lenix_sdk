import { useState } from "react"
import { triggerNuiCallback } from "@trippler/tr_lib/nui"
import type { ButtonStates, States } from "."
import Button from "./button"
import Dropdown from "./dropdown"

const Config = [
  { label: 'Disconnect' },
  { label: 'Bind', args: [
      { placeholder: 'The keyboard bind to use only when that resource is started', required: false },
      { placeholder: 'The keyboard bind to use', required: true },
      { placeholder: 'The command to trigger', required: true }
    ]
  },
  { label: 'Unbind', args: [ { placeholder: 'The keyboard bind to unbind', required: true } ] },
  { label: 'Toggle Fps', boolean: true },
  { label: 'Toggle Performance', boolean: true },
  { label: 'Quit', args: [ { placeholder: 'The reason for quitting', required: false } ] },
  { label: 'Story Mode' },
  { label: 'Game Volume', range: { min: 0, max: 100, unlimitedPositive: true } },
]

export default ({ search }: { search: string | null }) => {
  const [buttonsStates, setButtonsStates] = useState<ButtonStates>(null)
  const [states, setStates] = useState<States>(null)

  function toggleState(..._args: unknown[]) {
    setStates({ ...states, [arguments[0]]: !states?.[arguments[0]] })
    return !states?.[arguments[0]]
  }

  const nuiCallbacks = [
    {onClick: () => triggerNuiCallback('disconnect')},
    {onClick: (Key: string, Command: string) => triggerNuiCallback('bind', { Key, Command })},
    {onClick: (Key: string, Command: string) => triggerNuiCallback('unbind', { Key, Command })},
    {onClick: () => triggerNuiCallback('drawfps', { State: toggleState("drawfps") })},
    {onClick: () => triggerNuiCallback('drawperf', { State: toggleState("drawperf") })},
    {onClick: (Reason: string) => triggerNuiCallback('quit', { Reason })},
    {onClick: () => triggerNuiCallback('storymode')},
    {onClick: (Volume: number) => triggerNuiCallback('profile_sfxVolume', { Volume })},
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
    if (!feature.args && !feature.range) {
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