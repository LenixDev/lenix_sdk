import { useState } from 'react'
import './App.css'
import Buttons from './elements/buttons'
import Container from './elements/container'
import Header from './elements/header'
import SearchBar from './elements/search'
import ButtonGroup from './elements/group'
import type { Config } from './elements'

const App = () => {
  const [search, setSearch] = useState<string | null>(null)

  const CONFIG: Config = {
    staticButton: {
      disconnect: 'Disconnect',
      storymode: 'Story Mode',
      cmdlist: 'cmdlist',
    },
    dynamicButton: {
      drawfps: 'Toggle Fps',
      drawperf: 'Toggle Performance',
      developer: 'Developer Logging',
    },
    dropdown: {
      input: {
        bind: {
          label: 'Bind',
          args: [
            { placeholder: 'The keyboard bind to use only when that resource is started', required: false },
            { placeholder: 'The keyboard bind to use', required: true },
            { placeholder: 'The command to trigger', required: true }
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
            range: { min: 0, max: 100, unlimitedPositive: true },
          },
        },
        radio: {
          profile_musicVolumeInMp: {
            label: 'Music Volume',
            range: { min: 0, max: 100, unlimitedPositive: true },
            radio: ["Singleplayer", "Multiplayer"],
          },
        }
      }
    }
  } as const

  return (
    <Container>
      <Header/>
      <SearchBar onChange={setSearch}/>
      <ButtonGroup>
        <Buttons {...{ search, CONFIG }}/>
      </ButtonGroup>
    </Container>
  )
}

export default App