import { useState } from 'react'
import './App.css'
import { Buttons, ButtonGroup, Container, Header, SearchBar } from './elements'

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