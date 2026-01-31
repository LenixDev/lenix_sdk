import { triggerNuiCallback } from '@trippler/tr_lib/nui'
import type { Config } from '.'
import Button from './button'

export default ({ args }: { args: Config["dropdown"]["input"][string]["args"] }) => (
  <form className={`flex flex-col`} onSubmit={Event => {
    Event.preventDefault()
    const formData = new FormData(Event.currentTarget)
    const values = Array.from(formData.values())
    console.error(...values)
    triggerNuiCallback('execute', { Command: values.map(value => String(value))})
  }}>
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