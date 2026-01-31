export default ({
  label,
  style,
  type = 'button',
  onMouseDown,
  stopHolding
}: {
  label: string
  style?: string
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
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