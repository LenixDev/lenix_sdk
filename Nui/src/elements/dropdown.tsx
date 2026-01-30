import { useState } from "react"
import type { ButtonStates } from "."
import { keepOthersExpandedOnSelect } from "."
import Inputs from "./inputs"
import Range from "./range"
import Radio from "./radio"

const Button = ({ 
  buttonsStates,
  setButtonsStates,
  label
} : {
  buttonsStates: ButtonStates,
  setButtonsStates: (buttonsStates: ButtonStates) => void,
  label: string
}) => (
  <button
    type='button'
    className={`${buttonsStates?.[label] ? 'bg-stone-400' : 'bg-stone-500'}`}
    onClick={
      () => setButtonsStates(
        { ...(keepOthersExpandedOnSelect ? buttonsStates : {}), [label]: !buttonsStates?.[label] }
      )
    }
  >{buttonsStates?.[label] ? `⬇︎ ${label} ⬇︎` : `→ ${label} ←`}</button>
)

export default ({
  label,
  args,
  radio,
  range,
}: {
  label: string
  args?: unknown
  radio?: unknown
  range?: unknown
}) => {
  const [buttonsStates, setButtonsStates] = useState<ButtonStates>(null)
  return (
    <form className={`flex flex-col`} onSubmit={Event => {
      Event.preventDefault()
      const formData = new FormData(Event.currentTarget)
      const values = Array.from(formData.values())
      onClick(...values.map(value => String(value)))
    }}>
      <Button {...{ buttonsStates, setButtonsStates, label }} />
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