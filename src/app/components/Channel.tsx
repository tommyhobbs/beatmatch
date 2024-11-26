import { useState, useEffect, useRef } from "react"
import Button from "@/app/components/Button"
import Fader from "@/app/components/Fader"

const SLIDER_RANGE = 1600
const NO_OF_STEPS = 8

const Channel = ({
  src,
  originalBPM,
  number,
  handleBPMUpdate,
  isSubmitted,
}: {
  src: string
  originalBPM: number
  number: number
  handleBPMUpdate: (bpm: number) => void
  isSubmitted: boolean
}) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setPlaying] = useState(false)
  const [isCueing, setIsCueing] = useState(false)
  const [value, setValue] = useState<number>(0)
  const [BPM, setBPM] = useState<number>(originalBPM)

  const trackName = src.slice(-25)

  useEffect(() => {
    isPlaying ? audioRef?.current?.play() : audioRef?.current?.pause()
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

  useEffect(() => {
    if (audioRef.current) {
      const playbackSpeed = Number(value / 100)
      const playbackRate = 1 + playbackSpeed / 100
      console.log({ value, playbackSpeed, playbackRate })
      audioRef.current.playbackRate = playbackRate
      const BPM = originalBPM + (originalBPM / 100) * playbackSpeed
      setBPM(Math.round((BPM + Number.EPSILON) * 100) / 100)
      handleBPMUpdate(BPM)
      console.log(`...${trackName} - ${BPM} BPM`)
    }
  }, [value])

  return (
    <div className='grid grid-rows-[20px_20px_1fr] justify-items-center'>
      <h3>{`...${src.slice(-10)}`}</h3>
      <audio src={src} ref={audioRef}></audio>
      {isSubmitted ? <code>{BPM} BPM</code> : <div />}
      <div className='grid grid-rows-[1fr_80px] grid-cols-1 gap-2'>
        <Fader
          className={`channel-${number}`}
          range={SLIDER_RANGE}
          noOfSteps={NO_OF_STEPS}
          handleChange={(e) => setValue(Number(e.currentTarget.value))}
        />
        <div className='grid grid-cols-2 gap-2 text-gray-800 font-bold'>
          <Button
            onMouseDown={() => setIsCueing(true)}
            onMouseUp={() => setIsCueing(false)}
          >
            <span className='select-none'>Cue</span>
          </Button>
          <Button onClick={() => setPlaying(!isPlaying)}>
            <span className='select-none'>Play/Pause</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Channel
