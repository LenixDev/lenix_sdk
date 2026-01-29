import type { Feature } from "."

export default ({
  label,
  onClick
}: {
  label: Feature["label"],
  onClick: Feature["onClick"]
}) => {
  return <button type='button' onClick={onClick as any}>{label}</button>
}
