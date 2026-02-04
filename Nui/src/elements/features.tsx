import { useEffect, useState } from "react"
import type {
  Config,
  States,
  Configs
} from "."
import {
  DynamicButton,
  InputDropdown,
  RadioDropdown,
  RangeDropdown,
  StaticButton
} from "./components/items"

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
  const [buttonsStates, setButtonsStates] = useState<States>(null)
  const getMatcher = () => window.matchMedia('(prefers-color-scheme: dark)')
  const [isDarkMode, setIsDarkMode] = useState(getMatcher().matches)

  useEffect(() => {
    const matcher = getMatcher()
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
      return <StaticButton key={i} {...{ feature: feature as Config["staticButton"] }} />

      case 'dynamicButton':
      return <DynamicButton key={i} {...{ toggleBoolState, states, feature: feature as Config["dynamicButton"] }} />

      case 'input':
      return <InputDropdown key={i} {...{ isDarkMode, buttonsStates, setButtonsStates, feature: feature as Configs["InputDropdownType"] }} />

      case 'range':
      return <RangeDropdown key={i} {...{ isDarkMode, buttonsStates, setButtonsStates, feature: feature as Configs["RangeDropdownType"] }} />

      case 'radio':
      return <RadioDropdown key={i} {...{ isDarkMode, buttonsStates, setButtonsStates, feature: feature as unknown as Configs["RadioDropdownType"] }} />
    }
  })
}

export default Features