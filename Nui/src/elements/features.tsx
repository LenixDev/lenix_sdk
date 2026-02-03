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
import { onNuiCallback } from '@trippler/tr_lib/nui'

export const onClick: ExecuteCallback<unknown> = (command: string, parameters?: string | string[]) => triggerNuiCallback('execute', { command, parameters })

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

export default ({ search, CONFIG }: { search: string | null, CONFIG: Config }) => {
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
  const [displayState, setDisplayState] = useState(false)

  onNuiCallback('showMenu', () => {
    setDisplayState(true)
  })

  useEffect(() => {
    const matcher = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(matcher.matches)
    const handler = ({ matches }: { matches: boolean }) => setIsDarkMode(matches)
    matcher.addEventListener('change', handler)
    return () => matcher.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (displayState) {
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setDisplayState(false)
          document.removeEventListener('keydown', handler)
        }
      }
      document.addEventListener('keydown', handler)
    } else {
      document.getElementById('root')?.classList.remove('hidden')
    }
  }, [displayState])
  
  function toggleBoolState(..._howAwkwardXD: unknown[]) {
    setStates({ ...states, [arguments[0]]: !states?.[arguments[0]] })
    return !states?.[arguments[0]]
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