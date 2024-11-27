const Fader = ({
  className,
  range,
  handleChange,
}: {
  className: string
  range: number
  handleChange: (e: any) => void // eslint-disable-line
}) => {
  return (
    <input
      type='range'
      // @ts-expect-error compatibility
      orient='vertical'
      min={-(range / 2)}
      max={range / 2}
      defaultValue={0}
      className={`${className}`}
      onChange={handleChange}
      list='markers'
      onContextMenu={(e) => e.preventDefault()}
    />
  )
}

export default Fader
