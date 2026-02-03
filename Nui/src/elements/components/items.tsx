import type { ButtonStates, DynamicButtonType, InputDropdownType, RadioDropdownType, RangeDropdownType, SetState, States, StaticButtonType } from ".."
import { onClick } from "../features"
import Button from "./button"
import Dropdown from "./dropdown"
import Inputs from "./inputs"
import Radio from "./radio"
import Range from "./range"

export const StaticButton = ({ feature }: { feature: StaticButtonType }) => Object.entries(feature).map(([command, key], i) => <Button key={i} id={"StaticButton"} {...{ label: key, onMouseDown: () => onClick(command) }} />)

export const DynamicButton = ({
  feature, toggleBoolState, states
}: {
  feature: DynamicButtonType
  toggleBoolState: (command: string) => void
  states: States
}) => Object.entries(feature).map(([command, key], i) => {
  const onMouseDown = () => (toggleBoolState(command), onClick(command, String(states?.[command])))
  const style = states?.[command] ? "bg-green-500" : "bg-red-500"
  return <Button key={i} id={"DynamicButton"} {...{ label: key, onMouseDown, style }} />
})

export const InputDropdown = ({ 
  feature, isDarkMode, buttonsStates, setButtonsStates
}: {
  feature: InputDropdownType
  isDarkMode: boolean
  buttonsStates: ButtonStates
  setButtonsStates: SetState<ButtonStates>
}) => Object.entries(feature).map(([command, { label, args }], i) => (
  <Dropdown key={i} id={"Input"} {...{ label, isDarkMode, buttonsStates, setButtonsStates }}>
    <Inputs {...{ args, command } }  />
  </Dropdown>
))

export const RangeDropdown = ({ 
  feature, isDarkMode, buttonsStates, setButtonsStates
}: {
  feature: RangeDropdownType
  isDarkMode: boolean
  buttonsStates: ButtonStates
  setButtonsStates: SetState<ButtonStates>
}) => Object.entries(feature).map(([command, { label, range }], i) => (
  <Dropdown key={i} id={"Range"} {...{ label, isDarkMode, buttonsStates, setButtonsStates }}>
    <Range {...{ range, command }} />
  </Dropdown>
))

export const RadioDropdown = ({ 
  feature, isDarkMode, buttonsStates, setButtonsStates
}: {
  feature: RadioDropdownType
  isDarkMode: boolean
  buttonsStates: ButtonStates
  setButtonsStates: SetState<ButtonStates>
}) => Object.entries(feature).map(([, { label, range, radios }], i) => (
  <Dropdown key={i} id={"Radio"} {...{ label, isDarkMode, buttonsStates, setButtonsStates }}>
    <Radio {...{ radios, range }} />
  </Dropdown>
))