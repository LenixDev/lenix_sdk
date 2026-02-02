import { useState, useRef, useEffect } from "react"
import Button from "./button"
import type { GetRef, StaticRange } from ".."
import { onClick } from "../features"

const style = "px-2 bg-stone-600 rounded-md cursor-default"
type RangeValues = Record<string, number>

const getStorage = (command: string, min: number, max: number): RangeValues => {
  let storage = localStorage.getItem("rangeValues")
  if (storage) {
    return JSON.parse(storage)
  } else {
    saveStorage({
      [command]: (min + max) / 2
    })
    return getStorage(command, min, max)
  }
}
const saveStorage = (rangeValues: RangeValues) => {
  localStorage.setItem("rangeValues", JSON.stringify(rangeValues))
}

export default ({
  range: {
    min, max, unlimitedPositive
  }, command
}: {
  range: StaticRange
  command: string
}) => {
  const defaultRanges = getStorage(command, min, max)
  const [rangeValues, setRangeValues] = useState<RangeValues>(defaultRanges)
  const timerRef = useRef(0)

  useEffect(() => {
    saveStorage(rangeValues)
  }, [rangeValues])

  const startHolding = (
    direction: number,
    rangeValue: number
  ) => {
    setRangeValues(prev => ({...prev, [command]: rangeValue}))
    timerRef.current = setInterval(() => {
      setRangeValues(prev => ({...prev, [command]: Math.max(0, prev ? prev[command] + direction : 0 + direction)}))
    }, 100)
  }

  const stopHolding = (timerRef: GetRef<number>) => {
    clearInterval(timerRef.current)
  }
  useEffect(() => {
    if (rangeValues[command] === undefined) {
      const stored = getStorage(command, min, max)
      setRangeValues(prev => ({...prev, [command]: stored[command]}))
    }
  }, [command, min, max])

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="range">{(rangeValues[command])?.toFixed(1)}</label>
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
          id={command}
          type="range"
          step="0.1"
          min={min}
          max={max}
          value={rangeValues[command]}
          onChange={({ target: { value } }) => {
            const newValue = Number(value)
            setRangeValues({...rangeValues, [command]: newValue})
            onClick(command, String(newValue))
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