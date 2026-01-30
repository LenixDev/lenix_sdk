import { useState, useRef } from "react"
import Button from "./button"

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

export default () => (
  <div className="flex flex-col items-center">
    <div className="flex gap-1">
      <Button
        label="-"
        onClick={() => setRangeValue(rangeValue > 1 ? rangeValue - 1 : 0)}
        style={style}
        onMouseDown={() => startHolding(-1)}
        stopHolding={stopHolding}
      />
      <input
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
        onMouseDown={() => startHolding(1)}
        stopHolding={stopHolding}
      />
    </div>
    <div>{rangeValue.toFixed(1)}</div>
  </div>
)