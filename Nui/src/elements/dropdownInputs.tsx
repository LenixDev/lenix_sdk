import { type SetState, type States } from "."
import Dropdown from "./components/dropdown"
import Inputs from "./components/inputs"

const InputDropdown = ({
  feature, isDarkMode, buttonsStates, setButtonsStates
}: {
  feature: [string, {
    label: string;
    args?: {
      placeholder: string;
      required?: boolean;
      storageSave?: string;
      }[]
  }][]
  isDarkMode: boolean
  buttonsStates: States
  setButtonsStates: SetState<States>
}) => feature.map(([command, { label, args }], i) => (
  <Dropdown
    key={i}
    style="text-white"
    {...{ label, isDarkMode, buttonsStates, setButtonsStates }}
  >
    <Inputs {...{ args, command } }  />
  </Dropdown>
))

export default InputDropdown