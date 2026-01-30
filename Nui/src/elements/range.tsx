import { useState, useRef } from "react"
import Button from "./button"

const style = "px-2 bg-stone-600 rounded-md cursor-default"

type SetState = React.Dispatch<React.SetStateAction<number>>
type GetRef = React.RefObject<number>

const startHolding = (direction: number, setRangeValue: SetState, timerRef: GetRef) => {
  timerRef.current = setInterval(() => {
    setRangeValue(prev => Math.max(0, prev + direction))
  }, 100)
}

const stopHolding = (timerRef: GetRef) => {
  clearInterval(timerRef.current)
}

export default () => {
  const [rangeValue, setRangeValue] = useState(0)
  const timerRef = useRef(0)
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="range">{rangeValue.toFixed(1)}</label>
      <div className="flex gap-1">
        <Button
          label="-"
          onClick={() => setRangeValue(rangeValue > 1 ? rangeValue - 1 : 0)}
          style={style}
          onMouseDown={() => startHolding(-1, setRangeValue, timerRef)}
          stopHolding={() => stopHolding(timerRef)}
        />
        <input
          id="range"
          type="range"
          step="0.1"
          min={0}
          max={10}
          value={rangeValue}
          onChange={({ target: { value } }) => setRangeValue(Number(value))}
        />
        <Button
          label="+"
          onClick={() => setRangeValue(rangeValue + 1)}
          style={style}
          onMouseDown={() => startHolding(1, setRangeValue, timerRef)}
          stopHolding={() => stopHolding(timerRef)}
        />
      </div>
    </div>
  )
}