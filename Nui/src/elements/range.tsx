export default ({
  range,
  onChange
}: {
  range: number
  onChange: (range: number) => void
}) => <input type="range" step="0.1" min={0} max={10} value={range} onChange={({ target: { value } }) => onChange(Number(value))} />
