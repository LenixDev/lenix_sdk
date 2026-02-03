import { useEffect, useState } from "react"
import type { ButtonStates, Config, DynamicButton, ExecuteCallback, InputDropdown, RadioDropdown, RangeDropdown, States, StaticButton } from "."
import Button from "./components/button"
import Dropdown from "./components/dropdown"
import Inputs from "./components/inputs"
import Range from "./components/range"
import Radio from "./components/radio"
import { triggerNuiCallback } from "@trippler/tr_lib/nui"

export const onClick: ExecuteCallback<unknown> = (command: string, parameters?: string | string[]) => triggerNuiCallback('execute', { command, parameters })

const getFilteredConfig = (search: string | null, CONFIG: Config) => {
  const searchLower = search ? search.toLowerCase() : ''
  return {
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
}

export default ({ search, CONFIG }: { search: string | null, CONFIG: Config }) => {
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

  function toggleBoolState(..._howAwkwardXD: unknown[]) {
    setStates({ ...states, [arguments[0]]: !states?.[arguments[0]] })
    return !states?.[arguments[0]]
  }

  const { staticButton, dynamicButton, dropdown: { input, range: { static: range, radio } } } = getFilteredConfig(search, CONFIG)

  const features = () => Object.entries({
    ...(staticButton && { staticButton }),
    ...(dynamicButton && { dynamicButton }),
    ...(input && { input }),
    ...(range && { range }),
    ...(radio && { radio })
  })

  const StaticButton = ({ feature }: { feature: StaticButton }) => Object.entries(feature).map(([command, key], i) => (
    <Button key={i} id={"StaticButton"} {...{ label: key, onMouseDown: () => onClick(command) }} />
  ))

  const DynamicButton = ({ feature }: { feature: DynamicButton }) => Object.entries(feature).map(([command, key], i) => {
    const onMouseDown = () => (toggleBoolState(command), onClick(command, String(states?.[command])))
    const style = states?.[command] ? "bg-green-500" : "bg-red-500"
    return <Button key={i} id={"DynamicButton"} {...{ label: key, onMouseDown, style }} />
  })

  const InputDropdown = ({ feature }: { feature: InputDropdown }) => Object.entries(feature).map(([command, { label, args }], i) => (
    <Dropdown key={i} id={"Input"} {...{ label, isDarkMode, buttonsStates, setButtonsStates }}>
      <Inputs {...{ args, command } }  />
    </Dropdown>
  ))

  const RangeDropdown = ({ feature }: { feature: RangeDropdown }) => Object.entries(feature).map(([command, { label, range }], i) => (
    <Dropdown key={i} id={"Range"} {...{ label, isDarkMode, buttonsStates, setButtonsStates }}>
      <Range {...{ range, command }} />
    </Dropdown>
  ))

  const RadioDropdown = ({ feature }: { feature: RadioDropdown }) => Object.entries(feature).map(([, { label, range, radios }], i) => (
    <Dropdown key={i} id={"Radio"} {...{ label, isDarkMode, buttonsStates, setButtonsStates }}>
      <Radio {...{ radios, range }} />
    </Dropdown>
  ))

  return features().flatMap(([featureType, feature]) => {
    switch (featureType) {
      case 'staticButton':
      return <StaticButton {...{ feature: feature as StaticButton }} />

      case 'dynamicButton':
      return <DynamicButton {...{ feature: feature as DynamicButton }} />

      case 'input':
      return <InputDropdown {...{ feature: feature as InputDropdown }} />

      case 'range':
      return <RangeDropdown {...{ feature: feature as RangeDropdown }} />

      case 'radio':
      return <RadioDropdown {...{ feature: feature as unknown as RadioDropdown }} />
    }
  })
}