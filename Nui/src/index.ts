import { triggerNuiCallback } from "@trippler/tr_lib/nui"
import type { ExecuteCallback } from "./types"

const keepOthersExpandedOnSelect = false
const storageAddresses = {
  inputs: 'generatedButtons',
  ranges: 'rangeValues',
  dynamics: ''
}

const onClick: ExecuteCallback<unknown> = (command: string, parameters?: string | string[]) => {
  const RawCommand = `${command} ${parameters ? (Array.isArray(parameters) ? parameters.join(' ') : parameters) : ''}`
  triggerNuiCallback('execute', { RawCommand })
}

export {
  onClick,
  keepOthersExpandedOnSelect,
  storageAddresses
}