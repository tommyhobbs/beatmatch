"use client"

import { useEffect, useState } from "react"
import Channel from "./components/Channel"

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [ch1BPM, setCh1BPM] = useState<number>(123)
  const [ch2BPM, setCh2BPM] = useState<number>(127)
  const [ch1Src, setCh1Src] = useState<string>("")
  const [ch2Src, setCh2Src] = useState<string>("")

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

  const tracks = [
    "/music/wikiloops_jam_138511[120].mp3 ",
    "/music/wikiloops_jam_262000[124].mp3",
    "/music/wikiloops_jam_8855[128].mp3",
    "/music/wikiloops_jam_185349[125].mp3",
    "/music/wikiloops_jam_300128[115].mp3",
  ]
  useEffect(() => {
    const track1 = tracks[Math.floor(Math.random() * tracks.length)]

    let track2 = track1
    while (track2 === track1) {
      track2 = tracks[Math.floor(Math.random() * tracks.length)]
    }
    setCh1Src(track1)
    setCh2Src(track2)
  }, [])

  return (
    <div className='size-full grid grid-rows-[24px_1fr] items-center justify-items-center p-4 gap-2 sm:p-2 font-[family-name:var(--font-geist-sans)]'>
      {isSubmitted ? (
        <code>{`${difference} % ${score}`}</code>
      ) : (
        <button
          className='bg-yellow-100 text-black p-2 m-2 select-none'
          onClick={() => setIsSubmitted(true)}
        >
          submit
        </button>
      )}
      <div className='h-full grid grid-cols-2 gap-4'>
        <Channel
          src={ch1Src}
          currentBPM={ch1BPM}
          number={1}
          handleBPMUpdate={(bpm: number) => setCh1BPM(bpm)}
          isSubmitted={isSubmitted}
        />
        <Channel
          src={ch2Src}
          currentBPM={ch2BPM}
          number={2}
          handleBPMUpdate={(bpm: number) => setCh2BPM(bpm)}
          isSubmitted={isSubmitted}
        />
      </div>
    </div>
  )
}
