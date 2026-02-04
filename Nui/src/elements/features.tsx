import { useEffect, useState } from "react"
import type {
  ButtonStates,
  Config,
  ExecuteCallback,
  States,
  DynamicButtonType,
  InputDropdownType,
  RadioDropdownType,
  RangeDropdownType,
  StaticButtonType
} from "."
import { triggerNuiCallback } from "@trippler/tr_lib/nui"
import {
  DynamicButton,
  InputDropdown,
  RadioDropdown,
  RangeDropdown,
  StaticButton
} from "./components/items"

export const onClick: ExecuteCallback<unknown> = (command: string, parameters?: string | string[]) => {
  const RawCommand = `${command} ${parameters ? (Array.isArray(parameters) ? parameters.join(' ') : parameters) : ''}`
  triggerNuiCallback('execute', { RawCommand })
}

const getFilteredConfig = (search: string | null, CONFIG: Config) => {
  const searchLower = search ? search.toLowerCase() : ''
  return {
    staticButton: Object.fromEntries(
      Object.entries(CONFIG.staticButton).filter(([, val]) => 
        !search || val.toLowerCase().includes(searchLower)
      )
    ),
    dynamicButton: Object.fromEntries(
      Object.entries(CONFIG.dynamicButton).filter(([, val]) => 
        !search || val.toLowerCase().includes(searchLower)
      )
    ),
    dropdown: {
      input: Object.fromEntries(
        Object.entries(CONFIG.dropdown.input).filter(([, data]) => 
          !search || data.label.toLowerCase().includes(searchLower)
        )
      ),
      range: {
        static: Object.fromEntries(
          Object.entries(CONFIG.dropdown.range.static).filter(([, data]) => 
            !search || data.label.toLowerCase().includes(searchLower)
          )
        ),
        radio: Object.fromEntries(
          Object.entries(CONFIG.dropdown.range.radio).filter(([, data]) => 
            !search || data.label.toLowerCase().includes(searchLower)
          )
        )
      }
    }
  } as const
}

const Features = ({ search, CONFIG }: { search: string | null, CONFIG: Config }) => {
  const { staticButton, dynamicButton, dropdown: {
    input, range: {
      static: range,
      radio
    }
  }} = getFilteredConfig(search, CONFIG)
  const features = () => Object.entries({
    ...(staticButton && { staticButton }),
    ...(dynamicButton && { dynamicButton }),
    ...(input && { input }),
    ...(range && { range }),
    ...(radio && { radio })
  })

  const [states, setStates] = useState<States>(null)
  const [buttonsStates, setButtonsStates] = useState<ButtonStates>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const matcher = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(matcher.matches)
    const handler = ({ matches }: { matches: boolean }) => setIsDarkMode(matches)
    matcher.addEventListener('change', handler)
    return () => matcher.removeEventListener('change', handler)
  }, [])
  
  const toggleBoolState = (command: string) => {
    setStates({ ...states, [command]: !states?.[command] })
    return !states?.[command]
  }

  return features().flatMap(([featureType, feature], i) => {
    switch (featureType) {
      case 'staticButton':
      return <StaticButton key={i} {...{ feature: feature as StaticButtonType }} />

      case 'dynamicButton':
      return <DynamicButton key={i} {...{ toggleBoolState, states, feature: feature as DynamicButtonType }} />

      case 'input':
      return <InputDropdown key={i} {...{ isDarkMode, buttonsStates, setButtonsStates, feature: feature as InputDropdownType }} />

      case 'range':
      return <RangeDropdown key={i} {...{ isDarkMode, buttonsStates, setButtonsStates, feature: feature as RangeDropdownType }} />

      case 'radio':
      return <RadioDropdown key={i} {...{ isDarkMode, buttonsStates, setButtonsStates, feature: feature as unknown as RadioDropdownType }} />
    }
  })
}

export default Features