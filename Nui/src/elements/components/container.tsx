import type { Children } from "..";

export default ({ children }: { children: Children }) => (
  <div className={`bg-stone-500 rounded-md overflow-hidden m-auto`}>
    { children }
  </div>
)