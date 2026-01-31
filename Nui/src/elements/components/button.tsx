import type { ButtonTypes } from ".."

export default ({
  label,
  style,
  type = 'button',
  onMouseDown,
  stopHolding
}: {
  label: string
  style?: string
  type?: ButtonTypes
  onMouseDown?: () => void
  stopHolding?: () => void
}) => (
  <button
    type={type}
    className={style}
    onMouseDown={onMouseDown}
    onMouseLeave={stopHolding}
    onMouseUp={stopHolding}
  >{label}</button>
)