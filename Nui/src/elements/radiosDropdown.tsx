import type { SetState, States } from "../types"
import Dropdown from "./components/dropdown"
import Radio from "./components/radio"

const DropdownRadios = ({
  feature, isDarkMode, buttonsStates, setButtonsStates
}: {
  feature: [string, {
    label: string;
    range: {
      min: number
      max: number
      unlimitedPositive?: boolean
    };
    radios: Array<{
      command: string;
      label: string;
      checked?: boolean;
    }>
  }][]
  isDarkMode: boolean
  buttonsStates: States
  setButtonsStates: SetState<States>
}) => feature.map(([, { label, range, radios }], i) => (
  <Dropdown 
    key={i}
    style="text-white"
    {...{ label, isDarkMode, buttonsStates, setButtonsStates }}
  >
    <Radio {...{ radios, range }} />
  </Dropdown>
))

export default DropdownRadios