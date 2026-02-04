import { useEffect, useState } from 'react'
import './App.css'
import Container from './elements/components/container'
import Header from './elements/components/header'
import SearchBar from './elements/components/search'
import ButtonGroup from './elements/components/group'
import type { Config, States } from './elements'
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

  const getFilteredConfig = (search: string | null, CONFIG: Config) => {
    const searchLower = search ? search.toLowerCase() : ''
    return {
      staticButton: Object.fromEntries(
        Object.entries(CONFIG.staticButton).filter(([, val]) => 
          !search || val.toLowerCase().includes(searchLower)
        )
      ),
      dynamicButton: Object.fromEntries(
        Object.entries(CONFIG.dynamicButton).filter(([, val]) => 
          !search || val.toLowerCase().includes(searchLower)
        )
      ),
      dropdown: {
        input: Object.fromEntries(
          Object.entries(CONFIG.dropdown.input).filter(([, data]) => 
            !search || data.label.toLowerCase().includes(searchLower)
          )
        ),
        range: {
          static: Object.fromEntries(
            Object.entries(CONFIG.dropdown.range.static).filter(([, data]) => 
              !search || data.label.toLowerCase().includes(searchLower)
            )
          ),
          radio: Object.fromEntries(
            Object.entries(CONFIG.dropdown.range.radio).filter(([, data]) => 
              !search || data.label.toLowerCase().includes(searchLower)
            )
          )
        }
      }
    } as const
  }

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
  const {
    staticButton, 
    dynamicButton,
    dropdown: {
      input,
      range: {
        static: range,
        radio,
      },
    }
  } = getFilteredConfig(search, CONFIG)
  const features = {
    staticButton: Object.entries({
      ...(staticButton && { staticButton }),
    }),
    dynamicButton: Object.entries({
      ...(dynamicButton && { dynamicButton }),
    }),
    input: Object.entries({
      ...(input && { input }),
    }),
    range: Object.entries({
      ...(range && { range }),
    }),
    radio: Object.entries({
      ...(radio && { radio }),
    }),
  }

  const staticButtonFeature = features.staticButton.flatMap(([, feature]) => {
    return Object.entries(feature)
  })

  const dynamicButtonFeature = features.dynamicButton.flatMap(([, feature]) => {
    return Object.entries(feature)
  })

  const inputFeature = features.input.flatMap(([, feature]) => {
    return Object.entries(feature)
  })

  const rangeFeature = features.range.flatMap(([, feature]) => {
    return Object.entries(feature)
  })

  const radioFeature = features.radio.flatMap(([, feature]) => {
    return Object.entries(feature)
  })

  return (
    <Container {...{ displayState }}>
      <Header/>
      <ResetButton/>
      <SearchBar {...{ setSearch }}/>
      <ButtonGroup>
        <StaticButtons {...{ feature: staticButtonFeature }} />
        <DynamicButtons {...{ feature: dynamicButtonFeature }} />
        <DropdownInputs {...{ feature: inputFeature, isDarkMode, buttonsStates, setButtonsStates }} />
        <DropdownRanges {...{ feature: rangeFeature, isDarkMode, buttonsStates, setButtonsStates }} />
        <DropdownRadios {...{ feature: radioFeature, isDarkMode, buttonsStates, setButtonsStates }} />
      </ButtonGroup>
    </Container>
  )
}

export default App