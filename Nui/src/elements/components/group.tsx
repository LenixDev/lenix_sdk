import type { Children } from "..";

export default ({ children }: { children: Children }) => (
  <div className={`flex flex-col items-center gap-.2em`}>
    {children}
  </div>
)