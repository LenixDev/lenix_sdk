import type { Children } from "..";

export default ({ children }: { children: Children }) => (
  <div id="Container" className={`rounded-md overflow-hidden m-auto`}>
    { children }
  </div>
)