import type { Children } from ".";

export default ({ children }: { children: Children }) => (
  <div className={`bg-black rounded-md overflow-hidden m-auto`}>
    { children }
  </div>
)