import type { Feature, ButtonStates } from "."
import { keepOthersExpandedOnSelect } from "."
import Inputs from "./inputs"

export default ({
  label,
  onClick,
  args,
  buttonsStates,
  setButtonsStates,
}: {
  label: Feature["label"]
  onClick: Feature["onClick"]
  args: Feature["args"],
  buttonsStates: ButtonStates
  setButtonsStates: (state: ButtonStates) => void
}) => {
  return (
    <form className={`flex flex-col`} onSubmit={Event => {
      Event.preventDefault()
      const formData = new FormData(Event.currentTarget)
      const values = Array.from(formData.values())
      onClick(...values.map(value => String(value)))
    }}>
      <button
        type='button'
        className={`${buttonsStates?.[label] ? 'bg-stone-400' : 'bg-stone-500'}`}
        onClick={
          () => setButtonsStates(
            { ...(keepOthersExpandedOnSelect ? buttonsStates : {}), [label]: !buttonsStates?.[label] }
          )
        }
        >{buttonsStates?.[label] ? `⬇︎ ${label} ⬇︎` : `→ ${label} ←`}</button>
        {buttonsStates?.[label] && (
        <>
          <Inputs args={args} />
          <button type='submit' className="bg-blue-500">Submit</button>
        </>
      )}
    </form>
  )
}
