const Fader = ({
  className,
  range,
  noOfSteps,
  handleChange,
}: {
  className: string
  range: number
  noOfSteps: number
  handleChange: (e: any) => void // eslint-disable-line
}) => {
  const STEP = range / noOfSteps

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
