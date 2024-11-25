import Channel from "./components/Channel"

export default function Home() {
  return (
    <div className='grid grid-rows-[16px_1fr_16px] items-center justify-items-center min-h-screen p-2 gap-2 sm:p-2 font-[family-name:var(--font-geist-sans)]'>
      <h1>BeatMatch</h1>
      <div className='h-full grid grid-cols-2 gap-4'>
        <Channel
          src='/audio/Happiness Therapy - Groove Boys Project, Fasme & Dusty Fingers - Drop The Beat.mp3'
          originalBPM={124}
        />
        <Channel
          src='/audio/Wim Waldo - ClickClack EP - 02 Footsteps.mp3'
          originalBPM={127}
        />
      </div>
    </div>
  )
}
