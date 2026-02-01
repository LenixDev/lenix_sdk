import { useState, useRef } from "react"
import Button from "./button"
import type { GetRef, SetState, StaticRange } from ".."
import { onClick } from "../features"

const style = "px-2 bg-stone-600 rounded-md cursor-default"

const startHolding = (direction: number, setRangeValue: SetState<number>, timerRef: GetRef<number>, rangeValue: number) => {
  setRangeValue(rangeValue)
  timerRef.current = setInterval(() => {
    setRangeValue(prev => Math.max(0, prev + direction))
  }, 100)
}

const stopHolding = (timerRef: GetRef<number>) => {
  clearInterval(timerRef.current)
}

export default ({
  range: {
    min, max, unlimitedPositive
  }, key
}: {
  range: StaticRange
  key: string
}) => {
  const [rangeValue, setRangeValue] = useState(0)
  const timerRef = useRef(0)
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="range">{rangeValue.toFixed(1)}</label>
      <div className="flex gap-1">
        {unlimitedPositive && (
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
          min={min}
          max={max}
          value={rangeValue}
          onChange={({ target: { value } }) => (setRangeValue(Number(value)), onClick(key, String(rangeValue)))}
        />
        {unlimitedPositive && (
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