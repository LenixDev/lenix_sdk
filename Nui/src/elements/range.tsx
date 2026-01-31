import { useState, useRef } from "react"
import Button from "./button"
import type { Config } from "."

const style = "px-2 bg-stone-600 rounded-md cursor-default"

type SetState = React.Dispatch<React.SetStateAction<number>>
type GetRef = React.RefObject<number>

const startHolding = (direction: number, setRangeValue: SetState, timerRef: GetRef, rangeValue: number) => {
  setRangeValue(rangeValue)
  timerRef.current = setInterval(() => {
    setRangeValue(prev => Math.max(0, prev + direction))
  }, 100)
}

const stopHolding = (timerRef: GetRef) => {
  clearInterval(timerRef.current)
}

export default ({ range }: { range: Config["dropdown"]["range"]["static"][string]["range"] }) => {
  const [rangeValue, setRangeValue] = useState(0)
  const timerRef = useRef(0)
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="range">{rangeValue.toFixed(1)}</label>
      <div className="flex gap-1">
        {range.unlimitedPositive && (
            <Button
            label="-"
            style={style}
            onMouseDown={() => startHolding(-1, setRangeValue, timerRef, rangeValue > 1 ? rangeValue - 1 : 0)}
            stopHolding={() => stopHolding(timerRef)}
          />
        )}
        <input
          id="range"
          type="range"
          step="0.1"
          min={range.min}
          max={range.max}
          value={rangeValue}
          onChange={({ target: { value } }) => setRangeValue(Number(value))}
        />
        {range.unlimitedPositive && (
          <Button
            label="+"
            style={style}
            onMouseDown={() => startHolding(1, setRangeValue, timerRef, rangeValue + 1)}
            stopHolding={() => stopHolding(timerRef)}
          />
        )}
      </div>
    </div>
  )
}