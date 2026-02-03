import { useEffect, useState } from 'react'
import './App.css'
import Buttons from './elements/features'
import Container from './elements/components/container'
import Header from './elements/components/header'
import SearchBar from './elements/components/search'
import ButtonGroup from './elements/components/group'
import type { Config } from './elements'

const App = () => {
  const [search, setSearch] = useState<string | null>(null)
  const [displayState, setDisplayState] = useState(false)

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
      <SearchBar {...{ setSearch }}/>
      <ButtonGroup>
        <Buttons {...{ search, CONFIG }}/>
      </ButtonGroup>
    </Container>
  )
}

export default App