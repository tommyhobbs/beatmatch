"use client"

import { useState, useEffect, useRef } from "react"
import Button from "@/app/components/Button"
import Fader from "@/app/components/Fader"
import Notches from "@/app/components/Notches"

const SLIDER_RANGE = 1600

const Channel = ({
  src,
  currentBPM,
  number,
  handleBPMUpdate,
  isSubmitted,
}: {
  src: string
  currentBPM: number
  number: number
  handleBPMUpdate: (bpm: number) => void
  isSubmitted: boolean
}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isCueing, setIsCueing] = useState(false)
  const [isCenter, setIsCenter] = useState(true)
  const originalBPM = Number(src.match(/(?<=\[).+?(?=\])/g)?.[0] || 0)

  useEffect(() => {
    if (isPlaying) {
      audioRef?.current?.play()
    } else {
      audioRef?.current?.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      if (isCueing) {
        setIsPlaying(true)
        audioRef.current.currentTime = 0
      } else {
        setIsPlaying(false)
      }
    }
  }, [isCueing])

  const faderChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const playbackSpeed = Number(e.currentTarget.value) / 100
      const playbackRate = 1 + playbackSpeed / 100
      audioRef.current.playbackRate = playbackRate
      const bpm = originalBPM + (originalBPM / 100) * playbackSpeed
      setIsCenter(playbackRate < 1.002 && playbackRate > 0.998)
      handleBPMUpdate(bpm)
    }
  }

  return (
    <div className='grid grid-rows-[20px_20px_1fr] justify-items-center'>
      <h3>{`Ch - ${number}`}</h3>
      {src ? <audio src={src} ref={audioRef}></audio> : null}
      {isSubmitted ? <code>{currentBPM} BPM</code> : <div />}
      <div className='grid grid-rows-[1fr_80px] grid-cols-2 gap-2 justify-items-end'>
        <Notches isCenter={isCenter} />
        <Fader
          className={`channel-${number} justify-self-start`}
          range={SLIDER_RANGE}
          handleChange={faderChangeHandler}
        />
        <div className='col-span-2 grid grid-cols-2 gap-2 text-gray-800'>
          <Button
            onMouseDown={() => setIsCueing(true)}
            onMouseUp={() => setIsCueing(false)}
          >
            <span className='select-none'>cue</span>
          </Button>
          <Button onClick={() => setIsPlaying(!isPlaying)}>
            <span className='select-none'>start . stop</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Channel
