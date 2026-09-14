import { useLightingStore } from '@renderer/stores/useLightingStore'
import ColorPicker from './color-picker'
import Slider from './slider'

function BackgroundSection(): React.JSX.Element {
  const brightness = useLightingStore((state) => state.backgroundBrightness)
  const setBrightness = useLightingStore((state) => state.setBackgroundBrightness)
  const color = useLightingStore((state) => state.backgroundColor)
  const setColor = useLightingStore((state) => state.setBackgroundColor)

  return (
    <div className="shrink-0 w-132 p-4 flex flex-col gap-20">
      <div className="flex flex-col gap-4">
        <h2>COLOR</h2>
        <ColorPicker activeColor={color} onChange={setColor} />
      </div>
      <div className="flex flex-col gap-4">
        <h2>BRIGHTNESS</h2>
        <Slider value={brightness} onChange={setBrightness} label={Math.round(brightness) + '%'} />
      </div>
    </div>
  )
}

export default BackgroundSection
