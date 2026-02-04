import { type SetState, type States } from "."
import Dropdown from "./components/dropdown"
import Range from "./components/range"

const DropdownRanges = ({
  feature, isDarkMode, buttonsStates, setButtonsStates
}: {
  feature: [string, {
    label: string;
    range: {
      min: number
      max: number
      unlimitedPositive?: boolean
    };
  }][]
  isDarkMode: boolean
  buttonsStates: States
  setButtonsStates: SetState<States>
}) => feature.map(([command, { label, range }], i) => (
  <Dropdown
    key={i}
    style="text-white"
    {...{ label, isDarkMode, buttonsStates, setButtonsStates }}
  >
    <Range {...{ range, command }} />
  </Dropdown>
))

export default DropdownRanges