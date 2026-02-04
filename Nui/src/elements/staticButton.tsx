import { onClick } from "."
import Button from "./components/button"

const StaticButton = ({ feature }: { feature: [string, string][] }) =>
feature.map(([command, key], i) =>
  <Button
    key={i}
    id={"StaticButton"}
    style="text-white"
    {...{ label: key, onMouseDown: () => onClick(command) }}
  />
)

export default StaticButton