  import { useState } from 'react'
  import './App.css'
  import { triggerNuiCallback } from '@trippler/tr_lib/nui'

  const App = () => {
    const [search, setSearch] = useState<string>('')
    const [active, setActive] = useState<string | null>(null)
    const features: {
      label: string
      onClick: (...args: any[]) => void
      args?: Array<{ placeholder: string, required: boolean }>
    }[] = [
      {
        label: 'Disconnect',
        onClick: () => triggerNuiCallback('disconnect')
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
        onClick: (Key: string, Command: string) => triggerNuiCallback('bind', { Key, Command })
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
        onClick: (Resource: string, Key: string, Command: string) => triggerNuiCallback('resourcebind', { Resource, Key, Command })
      },
    ]

    const Buttons = () => {
      return features.map(({ label, onClick, args }) => {
        if (!args) {
          return <button key={label} onClick={onClick}>{label}</button>
        } else {
          return (
            <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const values = Array.from(formData.values())
                onClick(...values)
              }} style={{ display: 'flex', flexDirection: 'column' }}>
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

    return (
      <div style={{ backgroundColor: 'hsl(0, 0%, 0%)' }}>
        <h3 style={{ backgroundColor: 'hsl(0, 0.00%, 23.90%)' }}>SDK Tools</h3>
        <input
          type="text"
          placeholder='Search for a feature'
          onChange={ ({ target: { value } }) => setSearch(value) }
        />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '.5em',
          alignItems: 'center'
        }}>
          <Buttons />
        </div>
      </div>
    )
  }

  export default App
