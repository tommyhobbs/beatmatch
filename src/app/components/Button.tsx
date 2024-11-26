import { ReactElement } from "react"

const Button = ({
  children,
  onClick,
  onMouseUp,
  onMouseDown,
}: {
  children: ReactElement
  onClick?: () => void
  onMouseUp?: () => void
  onMouseDown?: () => void
}) => (
  <button
    className='bg-gray-400 active:bg-gray-500'
    onClick={onClick}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
    onTouchStart={onMouseDown}
    onTouchEnd={onMouseUp}
    onContextMenu={(e) => e.preventDefault()}
  >
    {children}
  </button>
)

export default Button
