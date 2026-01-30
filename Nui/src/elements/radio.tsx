import type { Feature } from "."

export default ({
  options
} : {
  options: Feature["radio"]
}) => (
  <div className="flex gap-1 justify-center">
    {options?.map((option, index) => (
      <div key={option}>
        <input type="radio" id={String(index)} name="name" value={option} />
        <label htmlFor={String(index)}>{option}</label>
      </div>
    ))}
  </div>
)