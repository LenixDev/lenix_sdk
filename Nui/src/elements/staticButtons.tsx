import { onClick } from ".."
import Button from "./components/button"

const StaticButtons = ({ feature }: { feature: [string, string][] }) =>
feature.map(([command, key], i) =>
  <Button
    key={i}
    style="StaticButton"
    {...{ label: key, onMouseDown: () => onClick(command) }}
  />
)

export default StaticButtons