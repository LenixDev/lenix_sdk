import { useMemo, useState } from 'react'
import './App.css'
import { triggerNuiCallback } from '@trippler/tr_lib/nui'


const App = () => {
  const [search, setSearch] = useState('')
  const features = [
    {
      label: 'Disconnect',
      onClick: () => triggerNuiCallback('disconnect')
    },
    {
      label: 'Bind',
      onClick: (Input: string, Command: string) => triggerNuiCallback('bind', { Input, Command })
    },
  ] as const

  const filteredFeatures = useMemo(() => features.filter(({ label }) => label.toLowerCase().includes(search.toLowerCase())), [search])

  return (
    <div style={{
      backgroundColor: 'hsl(0, 0%, 0%)'
    }}>
      <h3 style={{
        backgroundColor: 'hsl(0, 0.00%, 23.90%)'
      }}>SDK Tools</h3>
      <input type="text" placeholder='Search for a feature' onChange={({ target: { value } }) => {
        setSearch(value)
      }} />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '.5em',
        alignItems: 'center'
      }}>
        {filteredFeatures.map(({label, onClick}, _index) => {
          return <button key={label} onClick={onClick}>{label}</button>
        })}
      </div>
    </div>
  )
}

export default App
