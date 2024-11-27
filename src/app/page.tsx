"use client"

import { useState } from "react"
import Channel from "./components/Channel"

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [ch1BPM, setCh1BPM] = useState<number>(123)
  const [ch2BPM, setCh2BPM] = useState<number>(127)

  console.log({ ch1BPM, ch2BPM })

  const difference = 100 * Math.abs((ch1BPM - ch2BPM) / ((ch1BPM + ch2BPM) / 2))
  const differenceRounded = Math.round(difference)
  const scoreDescriptions = [
    "amazing",
    "fab",
    "great",
    "good",
    "not bad",
    "see me after class",
  ]
  const score = scoreDescriptions[differenceRounded] || "not even close"

  return (
    <div className='size-full grid grid-rows-[24px_1fr] items-center justify-items-center p-4 gap-2 sm:p-2 font-[family-name:var(--font-geist-sans)]'>
      {isSubmitted ? (
        <code>{`${difference} % ${score}`}</code>
      ) : (
        <button
          className='bg-yellow-100 text-black p-2 m-2'
          onClick={() => setIsSubmitted(true)}
        >
          Submit
        </button>
      )}
      <div className='h-full grid grid-cols-2 gap-4'>
        <Channel
          src='/audio/Alexander Robotnick - Undicidisco (Justin VanDerVolgen Edit).mp3'
          originalBPM={123}
          currentBPM={ch1BPM}
          number={1}
          handleBPMUpdate={(bpm: number) => setCh1BPM(bpm)}
          isSubmitted={isSubmitted}
        />
        <Channel
          src='/audio/Wim Waldo - ClickClack EP - 02 Footsteps.mp3'
          originalBPM={127}
          currentBPM={ch2BPM}
          number={2}
          handleBPMUpdate={(bpm: number) => setCh2BPM(bpm)}
          isSubmitted={isSubmitted}
        />
      </div>
    </div>
  )
}
