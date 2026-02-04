import type { ButtonStates, DynamicButtonType, InputDropdownType, RadioDropdownType, RangeDropdownType, SetState, States, StaticButtonType } from ".."
import { onClick } from "../features"
import Button from "./button"
import Dropdown from "./dropdown"
import Inputs from "./inputs"
import Radio from "./radio"
import Range from "./range"

const StaticButton = ({
  feature
}: { feature: StaticButtonType }) =>
  Object.entries(feature).map(([command, key], i) =>
  <Button
    key={i}
    id={"StaticButton"}
    style="text-white"
    {...{ label: key, onMouseDown: () => onClick(command) }}
    />
  )

const DynamicButton = ({
  feature, toggleBoolState, states
}: {
  feature: DynamicButtonType
  toggleBoolState: (command: string) => void
  states: States
}) => Object.entries(feature).map(([command, key], i) => {
  const onMouseDown = () => (toggleBoolState(command), onClick(command, String(states?.[command])))
  const style = states?.[command] ? "bg-green-500" : "bg-red-500"
  return <Button
    key={i}
    {...{ label: key, onMouseDown, style: style + " text-white" }}
  />
})

const InputDropdown = ({ 
  feature, isDarkMode, buttonsStates, setButtonsStates
}: {
  feature: InputDropdownType
  isDarkMode: boolean
  buttonsStates: ButtonStates
  setButtonsStates: SetState<ButtonStates>
}) => Object.entries(feature).map(([command, { label, args }], i) => (
  <Dropdown
    key={i}
    style="text-white"
    {...{ label, isDarkMode, buttonsStates, setButtonsStates }}
  >
    <Inputs {...{ args, command } }  />
  </Dropdown>
))

const RangeDropdown = ({ 
  feature, isDarkMode, buttonsStates, setButtonsStates
}: {
  feature: RangeDropdownType
  isDarkMode: boolean
  buttonsStates: ButtonStates
  setButtonsStates: SetState<ButtonStates>
}) => Object.entries(feature).map(([command, { label, range }], i) => (
  <Dropdown
    key={i}
    style="text-white"
    {...{ label, isDarkMode, buttonsStates, setButtonsStates }}
  >
    <Range {...{ range, command }} />
  </Dropdown>
))

const RadioDropdown = ({ 
  feature, isDarkMode, buttonsStates, setButtonsStates
}: {
  feature: RadioDropdownType
  isDarkMode: boolean
  buttonsStates: ButtonStates
  setButtonsStates: SetState<ButtonStates>
}) => Object.entries(feature).map(([, { label, range, radios }], i) => (
  <Dropdown 
    key={i}
    style="text-white"
    {...{ label, isDarkMode, buttonsStates, setButtonsStates }}
  >
    <Radio {...{ radios, range }} />
  </Dropdown>
))

export { StaticButton, DynamicButton, InputDropdown, RangeDropdown, RadioDropdown }