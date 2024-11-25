import { ReactElement } from "react"

const Button = ({
  children,
  onClick,
}: {
  children: ReactElement
  onClick?: () => void
}) => (
  <button
    className='border-2 border-slate-200 active:bg-cyan-600'
    onClick={onClick}
  >
    {children}
  </button>
)

export default Button
