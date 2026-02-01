import { useState, useRef } from "react"
import Button from "./button"
import type { GetRef, StaticRange } from ".."
import { onClick } from "../features"

export default ({
  range: {
    min, max, unlimitedPositive
  }, command
}: {
  range: StaticRange
  command: string
}) => {
  const style = "px-2 bg-stone-600 rounded-md cursor-default"
  
  const [rangeValues, setRangeValues] = useState<Record<string, number>>({[command]: 5})
  const timerRef = useRef(0)
  
  const startHolding = (
    direction: number,
    rangeValue: number
  ) => {
    setRangeValues({...rangeValues, [command]: rangeValue})
    timerRef.current = setInterval(() => {
      setRangeValues(prev => ({...prev, [command]: Math.max(0, prev ? prev[command] + direction : 0 + direction)}))
    }, 100)
  }

  const stopHolding = (timerRef: GetRef<number>) => {
    clearInterval(timerRef.current)
  }
  rangeValues[command] = rangeValues[command] || 5
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="range">{rangeValues[command].toFixed(1)}</label>
      <div className="flex gap-1">
        {unlimitedPositive && (
          <Button
            label="-"
            style={style}
            onMouseDown={() => startHolding(-1, rangeValues[command] > 1 ? rangeValues[command] - 1 : 0)}
            stopHolding={() => stopHolding(timerRef)}
          />
        )}
        <input
          id="range"
          type="range"
          step="0.1"
          min={min}
          max={max}
          value={rangeValues[command]}
          onChange={({ target: { value } }) => {
            setRangeValues({...rangeValues, [command]: Number(value)})
            onClick(command, String(rangeValues[command]))
          }}
        />
        {unlimitedPositive && (
          <Button
            label="+"
            style={style}
            onMouseDown={() => startHolding(1, rangeValues[command] + 1)}
            stopHolding={() => stopHolding(timerRef)}
          />
        )}
      </div>
    </div>
  )
}