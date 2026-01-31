import type { Config } from "."

export default ({ radio } : { radio: Config["dropdown"]["range"]["radio"][string]["radio"] }) => (
  <div className="flex gap-1 justify-center">
    {radio?.map((option, index) => (
      <div key={option}>
        <input type="radio" id={String(index)} name="name" value={option} />
        <label htmlFor={String(index)}>{option}</label>
      </div>
    ))}
  </div>
)