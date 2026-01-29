export const keepOthersExpandedOnSelect = false

export type Children = React.ReactNode

export type Feature = {
  label: string
  onClick: (...args: string[]) => void
  args?: {
    placeholder: string
    required: boolean
  }[]
}

export type ButtonStates = Record<string, boolean> | null