import { useState } from "react"
import type { ButtonStates, Config, ExecuteCallback, States } from "."
import Button from "./components/button"
import Dropdown from "./components/dropdown"
import Inputs from "./components/inputs"
import Range from "./components/range"
import Radio from "./components/radio"
import { triggerNuiCallback } from "@trippler/tr_lib/nui"

export default ({ search, CONFIG }: { search: string | null, CONFIG: Config }) => {
  const [states, setStates] = useState<States>(null)
  const [buttonsStates, setButtonsStates] = useState<ButtonStates>(null)

  function toggleBoolState(..._howAwkwardXD: unknown[]) {
    setStates({ ...states, [arguments[0]]: !states?.[arguments[0]] })
    return !states?.[arguments[0]]
  }

  const searchLower = search ? search.toLowerCase() : ''
  const filteredConfig = {
    staticButton: Object.fromEntries(
      Object.entries(CONFIG.staticButton).filter(([_, val]) => 
        !search || val.toLowerCase().includes(searchLower)
      )
    ),
    dynamicButton: Object.fromEntries(
      Object.entries(CONFIG.dynamicButton).filter(([_, val]) => 
        !search || val.toLowerCase().includes(searchLower)
      )
    ),
    dropdown: {
      input: Object.fromEntries(
        Object.entries(CONFIG.dropdown.input).filter(([_, data]) => 
          !search || data.label.toLowerCase().includes(searchLower)
        )
      ),
      range: {
        static: Object.fromEntries(
          Object.entries(CONFIG.dropdown.range.static).filter(([_, data]) => 
            !search || data.label.toLowerCase().includes(searchLower)
          )
        ),
        radio: Object.fromEntries(
          Object.entries(CONFIG.dropdown.range.radio).filter(([_, data]) => 
            !search || data.label.toLowerCase().includes(searchLower)
          )
        )
      }
    }
  } as const

  const { staticButton, dynamicButton, dropdown: { input, range: { static: staticRange, radio } } } = filteredConfig

  const features = {
    ...(staticButton && { staticButton }),
    ...(dynamicButton && { dynamicButton }),
    ...(input && { input }),
    ...(staticRange && { staticRange }),
    ...(radio && { radio })
  }

  const onClick: ExecuteCallback = (command: string | string[]) => triggerNuiCallback('execute', { command })

  return Object.entries(features).flatMap(([featureType, feature]) => {
    switch (featureType) {
      case 'staticButton':
      return Object.entries(feature).map(([key, label]) => (
        <Button key={key} {...{ label, onMouseDown: () => onClick(key) }} />
      ))
      case 'dynamicButton':
      return Object.entries(feature).map(([key, label]) => {
        const onMouseDown = () => toggleBoolState(key)
        const style = states?.[key] ? "bg-green-500" : "bg-red-500"
        return (
          <Button key={key} {...{ label, onMouseDown, style, onClick: () => onClick(key + ' ' + states?.[key]) }} />
      )})
      case 'input':
      return Object.entries(feature).map(([key, { label, args }]) => {
        return (
          <Dropdown key={key} {...{ label, buttonsStates, setButtonsStates }}>
            <Inputs {...{ args, onClick } }  />
          </Dropdown>
        )
      })
      case 'staticRange':
      return Object.entries(feature).map(([key, { label, range }]) => {
        return (
          <Dropdown key={key} {...{ label, buttonsStates, setButtonsStates }}>
            <Range {...{ range }} />
          </Dropdown>
        )
      })
      case 'radio':
      return Object.entries(feature).map(([key, { label, range, radio }]) => {
        return (
          <Dropdown key={key} {...{ label, buttonsStates, setButtonsStates }}>
            <Radio {...{ radio }} />
            <Range {...{ range }} />
          </Dropdown>
        )
      })
      default: {<div className="text-red-500">Configuration Error</div>}
    }
  })
}