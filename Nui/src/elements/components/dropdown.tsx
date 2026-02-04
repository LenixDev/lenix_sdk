import type { States, Children, SetState } from ".."
import { keepOthersExpandedOnSelect } from ".."
import Button from "./button"

const Dropdown = ({
  children,
  label,
  id,
  style,
  buttonsStates,
  setButtonsStates
}: {
  children: Children,
  label: string,
  id?: string,
  style?: string,
  buttonsStates: States,
  setButtonsStates: SetState<States>
}) =>
<div className={style}>
  <Button
    id={id}
    label={buttonsStates?.[label] ? `⬇︎ ${label} ⬇︎` : `→ ${label} ←`}
    style={`${buttonsStates?.[label] ? 'bg-stone-400' : 'bg-stone-500'}`}
    onMouseDown={
      () => {
      setButtonsStates({
        ...(keepOthersExpandedOnSelect ? buttonsStates : {}),
        [label]: !buttonsStates?.[label]
      })
    }}
  />
  {buttonsStates?.[label] && (
    children
  )}
</div>

export default Dropdown