import { useState } from "react"
import type { Feature, ButtonStates } from "."
import { keepOthersExpandedOnSelect } from "."
import Inputs from "./inputs"
import Range from "./range"
import Radio from "./radio"

export default ({
  label,
  onClick,
  args,
  radio,
  range,
}: {
  label: Feature["label"]
  onClick: Feature["onClick"]
  args?: Feature["args"]
  radio?: Feature["radio"]
  range?: Feature["range"]
}) => {
  const [buttonsStates, setButtonsStates] = useState<ButtonStates>(null)
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
          {args && !range ? (
            <>
              <Inputs args={args} />
              <button type='submit' className="bg-blue-500">Submit</button>
            </>
          ) : !args && range && radio ? (
            <>
              <Radio options={radio} />
              <Range />
            </>
          ) : !args && !radio && range ? (
              <Range />
          ) : (
            <div className="text-red-500">Configuration Error</div>
          )}
        </>
      )}
    </form>
  )
}