import { useEffect, useState } from 'react'
import './App.css'
import Container from './elements/components/container'
import Header from './elements/components/header'
import SearchBar from './elements/components/search'
import ButtonGroup from './elements/components/group'
import type { Config, States } from './types'
import ResetButton from './elements/components/reset'
import StaticButtons from './elements/staticButton'
import DynamicButtons from './elements/dynamicButton'
import DropdownInputs from './elements/dropdownInputs'
import DropdownRanges from './elements/dropdownRange'
import DropdownRadios from './elements/dropdownRadio'

const App = () => {
  const [search, setSearch] = useState<string | null>(null)
  const [displayState, setDisplayState] = useState(true)
  const [buttonsStates, setButtonsStates] = useState<States>(null)
  const getMatcher = () => window.matchMedia('(prefers-color-scheme: dark)')
  const [isDarkMode, setIsDarkMode] = useState(getMatcher().matches)

  const CONFIG: Config = {
    staticButton: {
      disconnect: 'Disconnect',
      storymode: 'Story Mode',
      cmdlist: 'cmdlist',
      list_aces: 'Show ACEs',
      list_principals: 'Show Principals',
    },
    dynamicButton: {
      cl_drawfps: 'Toggle Fps',
      cl_drawperf: 'Toggle Performance',
      developer: 'Developer Logging',
    },
    dropdown: {
      input: {
        bind: {
          label: 'Bind',
          args: [
            { placeholder: 'The keyboard bind to use only when that resource is started', required: false },
            { placeholder: 'The keyboard bind to use', required: true },
            { placeholder: 'The command to trigger', required: true, storageSave: 'unbind' }
          ],
        },
        unbind: {
          label: 'Unbind',
          args: [
            { placeholder: 'The keyboard bind to unbind', required: true }
          ],
        },
        quit: {
          label: 'Quit',
          args: [
            { placeholder: 'The reason for quitting', required: false }
          ],
        },
        con_miniconChannels: {
          label: 'Mini Console',
          args: [
            { placeholder: '* = all messages | script:* = all messages from all scripts', required: true }
          ],
        },
      },
      range: {
        static: {
          profile_sfxVolume: {
            label: 'Game Volume',
            range: { min: 0, max: 10, unlimitedPositive: true },
          },
        },
        radio: [
          {
            label: 'Music Volume',
            range: { min: 0, max: 10, unlimitedPositive: true },
            radios: [
              {
                command: "profile_musicVolume",
                label: "Singleplayer",
                checked: true
              },
              {
                command: "profile_musicVolumeInMp",
                label: "Multiplayer",
              }
            ]
          },
        ]
      }
    }
  } as const

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

  useEffect(() => {
    const matcher = getMatcher()
    const handler = ({ matches }: { matches: boolean }) => setIsDarkMode(matches)
    matcher.addEventListener('change', handler)
    return () => matcher.removeEventListener('change', handler)
  }, [])
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
      <ButtonGroup>
        <StaticButtons {...{ feature: staticButtonFeatures }} />
        <DynamicButtons {...{ feature: dynamicButtonFeatures }} />
        <DropdownInputs {...{ feature: inputFeatures, isDarkMode, buttonsStates, setButtonsStates }} />
        <DropdownRanges {...{ feature: rangeFeatures, isDarkMode, buttonsStates, setButtonsStates }} />
        <DropdownRadios {...{ feature: radioFeatures, isDarkMode, buttonsStates, setButtonsStates }} />
      </ButtonGroup>
    </Container>
  )
}

export default App