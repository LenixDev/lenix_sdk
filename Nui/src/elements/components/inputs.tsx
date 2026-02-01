import type { InputArgs } from '..'
import { onClick } from '../features'
import Button from './button'

export default ({
  args, key
}: {
  args: InputArgs
  key: string
}) => (
  <form
    className={`flex flex-col`}
    onSubmit={Event => {
      Event.preventDefault()
      const formData = new FormData(Event.currentTarget)
      const values = Array.from(formData.values())
      onClick(key, values.map(value => String(value)))
    }
  }>
    {args?.map(({ placeholder, required }, index) => 
      (
        <input
          key={index}
          name={`input-${index}`}
          type="text"
          placeholder={placeholder}
          required={required}
        />
      )
    )}
    <Button type={'submit'} style={"bg-blue-500"} label={"Submit"} />
  </form>
)