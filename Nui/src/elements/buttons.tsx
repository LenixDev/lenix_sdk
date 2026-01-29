import { useState } from "react"
import { triggerNuiCallback } from '@trippler/tr_lib/nui'

const keepOthersExpandedOnSelect = false

type Children = React.ReactNode
type Feature = {
  label: string
  onClick: (...args: string[]) => void
  args?: {
    placeholder: string
    required: boolean
  }[]
}
type ButtonStates = Record<string, boolean> | null

export const Container = ({ children }: { children: Children }) => (
  <div className={`bg-black rounded-md overflow-hidden m-auto`}>
    { children }
  </div>
)

export const Header = () => <h3 className={`bg-stone-600 text-center`}>SDK Tools</h3>

export const SearchBar = ({ onChange }: { onChange: (state: string) => void }) => (
  <input
    type="text"
    placeholder='Search for a feature'
    onChange={({ target: { value } }) => onChange(value) }
  />
)

export const ButtonGroup = ({ children }: { children: Children }) => (
  <div className={`flex flex-col items-center gap-.2em`}>
    {children}
  </div>
)

const Button = ({ label, onClick }: { label: Feature["label"], onClick: Feature["onClick"] }) => {
  return <button type='button' onClick={onClick as any}>{label}</button>
}

const Inputs = ({ args }: { args: Feature["args"] }) => {
  return args?.map(({ placeholder, required }, index) => 
    (
      <input
        key={index}
        name={`input-${index}`}
        type="text"
        placeholder={placeholder}
        required={required}
      />
    )
  )
}

const Dropdown = ({
  label,
  onClick,
  args,
  buttonsStates,
  setButtonsStates,
}: {
  label: Feature["label"]
  onClick: Feature["onClick"]
  args: Feature["args"],
  buttonsStates: ButtonStates
  setButtonsStates: (state: ButtonStates) => void
}) => {
  return (
    <form className={`flex flex-col`} onSubmit={Event => {
      Event.preventDefault()
      const formData = new FormData(Event.currentTarget)
      const values = Array.from(formData.values())
      onClick(...values.map(value => String(value)))
    }}>
      <button
        type='button'
        onClick={() => setButtonsStates({ ...(keepOthersExpandedOnSelect ? buttonsStates : {}), [label]: !buttonsStates?.[label] })}
      >{buttonsStates?.[label] ? `⬇︎ ${label} ⬇︎` : `→ ${label} ←`}</button>
      {buttonsStates?.[label] && (
        <>
          <Inputs args={args} />
          <button type='submit'>Submit</button>
        </>
      )}
    </form>
  )
}

export const Buttons = ({ search }: { search: string | null }) => {
  const [buttonsStates, setButtonsStates] = useState<ButtonStates>(null)
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

  return filteredFeatures.map(feature => {
    if (!feature.args) {
      return <Button key={feature.label} {...feature} />
    } else {
      return <Dropdown key={feature.label} {...feature} {...{ buttonsStates, setButtonsStates}} />
    }
  })
}