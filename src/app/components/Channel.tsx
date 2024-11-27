import { useState, useEffect, useRef } from "react"
import Button from "@/app/components/Button"
import Fader from "@/app/components/Fader"

const SLIDER_RANGE = 1600
const NO_OF_STEPS = 8

const Channel = ({
  src,
  originalBPM,
  currentBPM,
  number,
  handleBPMUpdate,
  isSubmitted,
}: {
  src: string
  originalBPM: number
  currentBPM: number
  number: number
  handleBPMUpdate: (bpm: number) => void
  isSubmitted: boolean
}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setPlaying] = useState(false)
  const [isCueing, setIsCueing] = useState(false)

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
        audioRef.current.play()
        audioRef.current.currentTime = 0
      } else {
        audioRef.current.pause()
      }
    }
  }, [isCueing])

  const faderChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const playbackSpeed = Number(e.currentTarget.value) / 100
      const playbackRate = 1 + playbackSpeed / 100
      audioRef.current.playbackRate = playbackRate
      const bpm = originalBPM + (originalBPM / 100) * playbackSpeed
      handleBPMUpdate(bpm)
    }
  }

  return (
    <div className='grid grid-rows-[20px_20px_1fr] justify-items-center'>
      <h3>{`Ch - ${number}`}</h3>
      <audio src={src} ref={audioRef}></audio>
      {isSubmitted ? <code>{currentBPM} BPM</code> : <div />}
      <div className='grid grid-rows-[1fr_80px] grid-cols-1 gap-2'>
        <Fader
          className={`channel-${number}`}
          range={SLIDER_RANGE}
          noOfSteps={NO_OF_STEPS}
          handleChange={faderChangeHandler}
        />
        <div className='grid grid-cols-2 gap-2 text-gray-800 font-bold'>
          <Button
            onMouseDown={() => setIsCueing(true)}
            onMouseUp={() => setIsCueing(false)}
          >
            <span className='select-none'>Cue</span>
          </Button>
          <Button onClick={() => setPlaying(!isPlaying)}>
            <span className='select-none'>Play / Pause</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Channel
