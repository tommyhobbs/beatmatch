import { ReactElement, useState } from "react"

const Fader = ({
  className,
  range,
  noOfSteps,
  handleChange,
}: {
  className: string
  range: number
  noOfSteps: number
  handleChange: (e: any) => void
}) => {
  const STEP = range / noOfSteps

  return (
    <>
      <input
        type='range'
        // @ts-ignore
        orient='vertical'
        min={-(range / 2)}
        max={range / 2}
        defaultValue={0}
        className={`${className}`}
        onChange={handleChange}
        list='markers'
      ></input>
      <datalist id='markers'>
        {Array(noOfSteps)
          .fill("")
          .map((_, i) => (
            <option value={i * STEP - range / 2} key={`option-${i}`}></option>
          ))}
      </datalist>
    </>
  )
}

export default Fader
