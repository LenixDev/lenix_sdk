import { useState } from 'react'
import './App.css'
import Buttons from './elements/buttons'
import Container from './elements/container'
import Header from './elements/header'
import SearchBar from './elements/search'
import ButtonGroup from './elements/group'

const App = () => {
  const [search, setSearch] = useState<string | null>(null)
  return (
    <Container>
      <Header/>
      <SearchBar onChange={setSearch}/>
      <ButtonGroup>
        <Buttons search={search}/>
      </ButtonGroup>
    </Container>
  )
}

export default App