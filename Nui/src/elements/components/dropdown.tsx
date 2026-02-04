import type { ButtonStates, Children, SetState } from ".."
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
  buttonsStates: ButtonStates,
  setButtonsStates: SetState<ButtonStates>
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