import { useState } from "react"
import type { Config, States } from "."
import Button from "./button"

export default ({ search, CONFIG }: { search: string | null, CONFIG: Config }) => {

  const [states, setStates] = useState<States>(null)

  function toggleState(..._howAwkwardXD: unknown[]) {
    setStates({ ...states, [arguments[0]]: !states?.[arguments[0]] })
    return !states?.[arguments[0]]
  }

  const searchLower = search ? search.toLowerCase() : ''

  const filteredConfig = {
    staticButton: Object.fromEntries(
      Object.entries(CONFIG.staticButton).filter(([_, val]) => 
        !search || val.toLowerCase().includes(searchLower)
      )
    ),
    dynamicButton: Object.fromEntries(
      Object.entries(CONFIG.dynamicButton).filter(([_, val]) => 
        !search || val.toLowerCase().includes(searchLower)
      )
    ),
    dropdown: {
      input: Object.fromEntries(
        Object.entries(CONFIG.dropdown.input).filter(([_, data]) => 
          !search || data.label.toLowerCase().includes(searchLower)
        )
      ),
      range: {
        static: Object.fromEntries(
          Object.entries(CONFIG.dropdown.range.static).filter(([_, data]) => 
            !search || data.label.toLowerCase().includes(searchLower)
          )
        ),
        radio: Object.fromEntries(
          Object.entries(CONFIG.dropdown.range.radio).filter(([_, data]) => 
            !search || data.label.toLowerCase().includes(searchLower)
          )
        )
      }
    }
  } as const

  const { staticButton, dynamicButton, dropdown: { input, range: { static: staticRange, radio } } } = filteredConfig
  if (staticButton) {
  } else if (dynamicButton) {
  } else if (input) {
  } else if (staticRange) {
  } else if (radio) {
  }
}