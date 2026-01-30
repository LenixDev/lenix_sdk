export const keepOthersExpandedOnSelect = false

export type Children = React.ReactNode

export type Feature = {
  label: string
  onClick: (...args: any[]) => void
  args?: {
    placeholder: string
    required: boolean
  }[]
  range?: {
    min: number, max: number
    unlimitedPositive?: boolean
  }
  
}

export type States = Record<string, boolean> | null
export type ButtonStates = States