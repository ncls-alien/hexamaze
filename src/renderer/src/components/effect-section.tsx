import ColorPicker from './color-picker'
import Slider from './slider'
import EffectList from './effect-list'
import { useLightingStore } from '@renderer/stores/useLightingStore'

const minSpeed = 0.1
const maxSpeed = 3

function EffectSection(): React.JSX.Element {
  const effectSpeed = useLightingStore((state) => state.effectSpeed)
  const setEffectSpeed = useLightingStore((state) => state.setEffectSpeed)
  const color = useLightingStore((state) => state.effectColor)
  const setColor = useLightingStore((state) => state.setEffectColor)

  return (
    <div className="shrink-0 w-132 p-4 flex flex-col gap-20">
      <div className="flex flex-col gap-4">
        <h2>COLOR</h2>
        <ColorPicker activeColor={color} onChange={setColor} />
      </div>
      <div className="flex flex-col gap-4">
        <h2>EFFECT</h2>
        <EffectList />
      </div>
      <div className="flex flex-col gap-4">
        <h2>SPEED</h2>
        <Slider
          value={effectSpeed}
          onChange={setEffectSpeed}
          min={minSpeed}
          max={maxSpeed}
          label={+effectSpeed.toFixed(1) + 's'}
        />
      </div>
    </div>
  )
}

export default EffectSection
