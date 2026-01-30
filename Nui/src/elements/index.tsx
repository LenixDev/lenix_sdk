export const keepOthersExpandedOnSelect = false

export type Children = React.ReactNode

interface Range {
  min: number
  max: number
  unlimitedPositive?: boolean
}

interface Button {
  [key: string]: string
}

export interface Config {
  staticButton: Button
  dynamicButton: Button
  dropdown: {
    input: {
      [key: string]: {
        label: string
        args?: {
          placeholder: string
          required?: boolean
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
      radio: {
        [key: string]: {
          label: string
          range: Range
          radio: string[]
        }
      }
    }
  }
}

export type States = Record<string, boolean> | null
export type ButtonStates = States