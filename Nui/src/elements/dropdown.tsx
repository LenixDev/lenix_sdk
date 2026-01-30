import { useRef, useState } from "react"
import type { Feature, ButtonStates } from "."
import { keepOthersExpandedOnSelect } from "."
import Button from "./button"
import Inputs from "./inputs"
import Range from "./range"

export default ({
  label,
  onClick,
  args,
  range,
  buttonsStates,
  setButtonsStates,
}: {
  label: Feature["label"]
  onClick: Feature["onClick"]
  args?: Feature["args"]
  range?: Feature["range"]
  buttonsStates: ButtonStates
  setButtonsStates: (state: ButtonStates) => void
}) => {
  const [rangeValue, setRangeValue] = useState(0)
  const style = "px-2 bg-stone-600 rounded-md cursor-default"
  
  const timerRef = useRef(0)

  const startHolding = (direction: number) => {
    timerRef.current = setInterval(() => {
      setRangeValue(prev => Math.max(0, prev + direction))
    }, 100)
  }

  const stopHolding = () => {
    clearInterval(timerRef.current)
  }

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
          ) : !args && range ? (
            <div className="flex flex-col items-center">
              <div className="flex gap-1">
                <Button
                  label="-"
                  onClick={() => setRangeValue(rangeValue > 1 ? rangeValue - 1 : 0)}
                  style={style}
                  onMouseDown={() => startHolding(-1)}
                  stopHolding={stopHolding}
                />
                <Range range={rangeValue} onChange={setRangeValue} />
                <Button
                  label="+"
                  onClick={() => setRangeValue(rangeValue + 1)}
                  style={style}
                  onMouseDown={() => startHolding(1)}
                  stopHolding={stopHolding}
                />
              </div>
              <div>{rangeValue.toFixed(1)}</div>
            </div>
          ) : (
            <div className="text-red-500">Configuration Error</div>
          )}
        </>
      )}
    </form>
  )
}