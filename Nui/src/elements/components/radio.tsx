import type { Radios, StaticRange } from ".."
import Range from "./range"

export default ({
  radios, range, key
} : {
  radios: Radios, 
  range: StaticRange
  key: string
}) => {
  console.log(radios)
  return (
    <>
      <div className="flex gap-1 justify-center">
        {Object.entries(radios).map(([option, label]) => (
          <div key={option}>
            <input type="radio" id={String(option)} name="name" value={option} />
            <label htmlFor={String(option)}>{label}</label>
          </div>
        ))}
      </div>
      <Range {...{ range, key }} />
    </>
  )
}