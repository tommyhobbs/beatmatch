"use client"

import { useState, useEffect, useRef } from "react"
import Button from "@/app/components/Button"
import Fader from "@/app/components/Fader"

const SLIDER_RANGE = 200
const NO_OF_STEPS = 8

const Channel = ({
  src,
  originalBPM,
}: {
  src: string
  originalBPM: number
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
      const playbackRate = Number(1 + value / 1000)
      audioRef.current.playbackRate = playbackRate
      const BPM = originalBPM * playbackRate
      console.log(`...${trackName} - ${BPM} BPM`)
    }
  }, [value])

  return (
    <div className='grid grid-rows-[60px_1fr]'>
      <h3>{`...${src.slice(-25)}`}</h3>
      <audio src={src} ref={audioRef}></audio>
      <div className='grid grid-rows-[1fr_80px] gap-2 border-2 border-slate-200'>
        <Fader
          className='w-full'
          range={SLIDER_RANGE}
          noOfSteps={NO_OF_STEPS}
          handleChange={(e) => setValue(Number(e.currentTarget.value))}
        />
        <div className='grid grid-cols-2'>
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
