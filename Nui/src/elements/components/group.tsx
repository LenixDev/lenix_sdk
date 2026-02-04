import type { Children } from ".."

const Group = ({ children }: { children: Children }) =>
<div className={`flex flex-col items-center gap-.2em`}>
  {children}
</div>

export default Group