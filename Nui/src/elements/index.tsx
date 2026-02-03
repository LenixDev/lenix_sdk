import type { Dispatch, SetStateAction } from "react"

export const keepOthersExpandedOnSelect = false

export type Children = React.ReactNode

export type States = Record<string, boolean> | null
export type ButtonStates = States
export type SetState<S> = Dispatch<SetStateAction<S>>
export type ExecuteCallback<T> = (command: string, parameters?: string | string[]) => T
export type InputArgs = Config["dropdown"]["input"][string]["args"]
export type ButtonTypes = React.ButtonHTMLAttributes<HTMLButtonElement>['type']
export type StaticRange = Config["dropdown"]["range"]["static"][string]["range"]
export type Radios = Config["dropdown"]["range"]["radio"][number]["radios"]
export type GeneratedButtons = Record<string, string>
export type StaticButton = Config["staticButton"]
export type DynamicButton = Config["dynamicButton"]
export type InputDropdown = Config["dropdown"]["input"]
export type RangeDropdown = Config["dropdown"]["range"]["static"]
export type RadioDropdown = Config["dropdown"]["range"]["radio"]

export type GetRef<T> = React.RefObject<T>

interface Range {
  min: number
  max: number
  unlimitedPositive?: boolean
}

export interface Config {
  staticButton: {
    [key: string]: string
  }
  dynamicButton: {
    [key: string]: string
  }
  dropdown: {
    input: {
      [key: string]: {
        label: string
        args?: {
          placeholder: string
          required?: boolean
          storageSave?: string
        }[]
      }
    }
    range: {
      static: {
        [key: string]: {
          label: string
          range: Range
        }
      }
      radio: Array<{
        label: string
        range: Range
        radios: Array<{
          command: string
          label: string
          checked?: boolean
        }>
      }>
    }
  }
}