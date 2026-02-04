import { useEffect, useState } from 'react'
import './App.css'
import Container from './elements/components/container'
import Header from './elements/components/header'
import SearchBar from './elements/components/search'
import Groups from './elements/components/group'
import type { States } from './types'
import ResetButton from './elements/components/reset'
import StaticButtons from './elements/staticButtons'
import DynamicButtons from './elements/dynamicButtons'
import DropdownInputs from './elements/InputsDropdown'
import DropdownRanges from './elements/rangesDropdown'
import DropdownRadios from './elements/radiosDropdown'
import { CONFIG } from '.'

const App = () => {
  const [search, setSearch] = useState<string | null>(null)
  const [displayState, setDisplayState] = useState(true)
  const [buttonsStates, setButtonsStates] = useState<States>(null)

  const searchLower = search ? search.toLowerCase() : ''
  const staticButtons = Object.fromEntries(
    Object.entries(CONFIG.staticButton).filter(([, val]) => 
      !search || val.toLowerCase().includes(searchLower)
    )
  )
  const dynamicButtons = Object.fromEntries(
    Object.entries(CONFIG.dynamicButton).filter(([, val]) => 
      !search || val.toLowerCase().includes(searchLower)
    )
  )
  const { inputs, ranges } = {
    inputs: Object.fromEntries(
      Object.entries(CONFIG.dropdown.input).filter(([, data]) => 
        !search || data.label.toLowerCase().includes(searchLower)
      )
    ),
    ranges: {
      statics: Object.fromEntries(
        Object.entries(CONFIG.dropdown.range.static).filter(([, data]) => 
          !search || data.label.toLowerCase().includes(searchLower)
        )
      ),
      radios: Object.fromEntries(
        Object.entries(CONFIG.dropdown.range.radio).filter(([, data]) => 
          !search || data.label.toLowerCase().includes(searchLower)
        )
      )
    }
  } as const

  const staticButtonFeatures = Object.entries({
    ...(staticButtons && { staticButton: staticButtons }),
  }).flatMap(([, feature]) => {
    return Object.entries(feature)
  })

  const dynamicButtonFeatures = Object.entries({
    ...(dynamicButtons && { dynamicButton: dynamicButtons }),
  }).flatMap(([, feature]) => {
    return Object.entries(feature)
  })

  const inputFeatures = Object.entries({
    ...(inputs && { input: inputs }),
  }).flatMap(([, feature]) => {
    return Object.entries(feature)
  })

  const rangeFeatures = Object.entries({
    ...(ranges.statics && { range: ranges.statics }),
  }).flatMap(([, feature]) => {
    return Object.entries(feature)
  })

  const radioFeatures = Object.entries({
    ...(ranges.radios && { radio: ranges.radios }),
  }).flatMap(([, feature]) => {
    return Object.entries(feature)
  })

  window.addEventListener('message', ({ data: { action } }) => action === 'showMenu' && setDisplayState(true))

  useEffect(() => {
    if (!displayState) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDisplayState(false)
        document.removeEventListener('keydown', handler)
        fetch(`https://${GetParentResourceName()}/hideMenu`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({}),
        });
      }
    }
    document.addEventListener('keydown', handler)
  }, [displayState])

  return (
    <Container {...{ displayState }}>
      <Header/>
      <ResetButton/>
      <SearchBar {...{ setSearch }}/>
      <Groups>
        <h3 className='Header' >Statics</h3>
        <StaticButtons {...{ feature: staticButtonFeatures }} />
        <h3 className='Header' >Dynamics</h3>
        <DynamicButtons {...{ feature: dynamicButtonFeatures }} />
        <h3 className='Header' >Inputs</h3>
        <DropdownInputs {...{ feature: inputFeatures, buttonsStates, setButtonsStates }} />
        <h3 className='Header' >Ranges</h3>
        <DropdownRanges {...{ feature: rangeFeatures, buttonsStates, setButtonsStates }} />
        <h3 className='Header' >Range Radios</h3>
        <DropdownRadios {...{ feature: radioFeatures, buttonsStates, setButtonsStates }} />
      </Groups>
    </Container>
  )
}

export default App