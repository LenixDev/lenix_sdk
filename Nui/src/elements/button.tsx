export default ({
  label,
  style,
  onMouseDown,
  stopHolding
}: {
  label: string
  style?: string
  onMouseDown?: () => void
  stopHolding?: () => void
}) => (
  <button
    type='button'
    className={style}
    onMouseDown={onMouseDown}
    onMouseLeave={stopHolding}
    onMouseUp={stopHolding}
  >{label}</button>
)
