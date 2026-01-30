import type { Feature } from "."

export default ({
  label,
  onClick,
  style,
  onMouseDown,
  stopHolding
}: {
  label: Feature["label"]
  onClick: Feature["onClick"]
  style?: string
  onMouseDown?: () => void
  stopHolding?: () => void
}) => (
  <button
    type='button'
    onClick={onClick}
    className={style}
    onMouseDown={onMouseDown}
    onMouseLeave={stopHolding}
    onMouseUp={stopHolding}
  >{label}</button>
)
