"use client"

import { useState, useEffect, useRef } from "react"
import Button from "@/app/components/Button"
import Fader from "@/app/components/Fader"

const SLIDER_RANGE = 1600
const NO_OF_STEPS = 8

const Channel = ({
  src,
  originalBPM,
  number,
}: {
  src: string
  originalBPM: number
  number: number
}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setPlaying] = useState(false)
  const [value, setValue] = useState<number>(0)

  const trackName = src.slice(-25)

  useEffect(() => {
    isPlaying ? audioRef?.current?.play() : audioRef?.current?.pause()
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      const playbackSpeed = Number(value / 100)
      const playbackRate = 1 + playbackSpeed / 100
      console.log({ value, playbackSpeed, playbackRate })
      audioRef.current.playbackRate = playbackRate
      const BPM = originalBPM + (originalBPM / 100) * playbackSpeed
      console.log(`...${trackName} - ${BPM} BPM`)
    }
  }, [value])

  return (
    <div className='grid grid-rows-[60px_1fr]'>
      <h3>{`...${src.slice(-25)}`}</h3>
      <audio src={src} ref={audioRef}></audio>
      <div className='grid grid-rows-[1fr_80px] grid-cols-1 gap-2'>
        <Fader
          className={`channel-${number} w-full`}
          range={SLIDER_RANGE}
          noOfSteps={NO_OF_STEPS}
          handleChange={(e) => setValue(Number(e.currentTarget.value))}
        />
        <div className='grid grid-cols-2 border-2 border-slate-200'>
          <Button onClick={() => setPlaying(!isPlaying)}>
            <span>Cue</span>
          </Button>
          <Button onClick={() => setPlaying(!isPlaying)}>
            <span>Play/Pause</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Channel
