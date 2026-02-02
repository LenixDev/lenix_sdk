import type { ButtonStates, Children, SetState } from ".."
import { keepOthersExpandedOnSelect } from ".."
import Button from "./button"

export default ({
  children,
  label,
  id,
  buttonsStates,
  setButtonsStates
}: {
  children: Children,
  label: string,
  id?: string,
  buttonsStates: ButtonStates,
  setButtonsStates: SetState<ButtonStates>
}) =>
<>
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
</>