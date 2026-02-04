import type { Children } from ".."

export const Container = ({ children, displayState }: { children: Children, displayState: boolean }) => (
  <div id="Container" className={`${displayState ? '' : 'hidden'} scheme-light-dark bg-stone-500 rounded-md overflow-hidden m-auto`}>
    { children }
  </div>
)

export default Container