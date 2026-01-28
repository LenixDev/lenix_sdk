import { useState } from "react"
import { triggerNuiCallback } from '@trippler/tr_lib/nui'

export const Container = ({ children }: { children: React.ReactNode }) => (
  <div style={{ backgroundColor: 'hsl(0, 0%, 0%)' }}>
    { children }
  </div>
)

export const Header = () => <h3 style={{ backgroundColor: 'hsl(0, 0.00%, 23.90%)' }}>SDK Tools</h3>

export const SearchBar = ({ onChange }: { onChange: (value: string) => void }) => (
  <input
    type="text"
    placeholder='Search for a feature'
    onChange={( { target: { value } } ) => onChange(value) }
  />
)

export const ButtonGroup = ({ children }: { children: React.ReactNode }) => (
  <div id="ButtonGroup">
    {children}
  </div>
)

export const Buttons = ({ search }: { search: string | null }) => {
  const [active, setActive] = useState<string | null>(null)
  const fromCB = [
    {
      label: 'Disconnect',
    },
    {
      label: 'Bind',
      args: [
        {
          placeholder: 'The keyboard bind to use',
          required: true
        },
        {
          placeholder: 'The command to trigger',
          required: true
        },
      ],
    },
    {
      label: 'Resource Bind',
      args: [
        {
          placeholder: 'The keyboard bind to use only when that resource is started',
          required: true
        },
        {
          placeholder: 'The keyboard bind to use',
          required: true
        },
        {
          placeholder: 'The command to trigger',
          required: true
        },
      ],
    },
  ]

  const nuiCallbacks = [
    {onClick: () => triggerNuiCallback('disconnect')},
    {onClick: (Key: string, Command: string) => triggerNuiCallback('bind', { Key, Command })},
    {onClick: (Resource: string, Key: string, Command: string) => triggerNuiCallback('resourcebind', { Resource, Key, Command })},
  ] as const
  
  const features = fromCB.map((item, index) => (
    { ...item, onClick: nuiCallbacks[index].onClick }
  ))

  const filteredFeatures = features.filter(({ label }) => 
    !search || label.toLowerCase().includes(search.toLowerCase())
  )

  return filteredFeatures.map(({ label, onClick, args }) => {
    if (!args) {
      return <button key={label} onClick={onClick as any}>{label}</button>
    } else {
      return (
        <form key={label} style={{ display: 'flex', flexDirection: 'column' }} onSubmit={({ currentTarget }) => {
          const formData = new FormData(currentTarget)
          const values = Array.from(formData.values())
          onClick(...values)
        }}>
          <button type='button' onClick={() => setActive(label)}>{label}</button>
          {active === label && (
            <>
              {args.map(({ placeholder, required }, index) => 
                <input
                  key={index}
                  name={`input-${index}`}
                  type="text"
                  placeholder={placeholder}
                  required={required}
                />
              )}
              <button type='submit'>Submit</button>
            </>
          )}
        </form>
      )
    }
  })
}