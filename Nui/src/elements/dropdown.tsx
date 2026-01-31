import { useState } from "react"
import type { ButtonStates, Children } from "."
import { keepOthersExpandedOnSelect } from "."
import Button from "./button"

export default ({ children, label }: { children: Children, label: string }) => {
  const [buttonsStates, setButtonsStates] = useState<ButtonStates>(null)
  return (
    <>
      <Button
        label={buttonsStates?.[label] ? `⬇︎ ${label} ⬇︎` : `→ ${label} ←`}
        style={`${buttonsStates?.[label] ? 'bg-stone-400' : 'bg-stone-500'}`}
        onMouseDown={
          () => {
            setButtonsStates(
            { ...(keepOthersExpandedOnSelect ? buttonsStates : {}), [label]: !buttonsStates?.[label] }
          )
        }}
      />
      {buttonsStates?.[label] && (
        children
      )}
    </>
  )
}