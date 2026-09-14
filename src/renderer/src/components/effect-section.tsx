import { useState } from 'react'
import ColorPicker from './color-picker'
import Slider from './slider'
import EffectList from './effect-list'

const colors: Record<string, string> = {
  white: '#ffffff',
  red: '#ff0000',
  amber: '#ff7f00',
  yellow: '#ffff00',
  green: '#00ff00',
  cyan: '#00ffff',
  blue: '#0000ff',
  pink: '#ff00ff'
}

const minSpeed = 0.1
const maxSpeed = 3

function EffectSection(): React.JSX.Element {
  const [speed, setSpeed] = useState(1.5)
  const [color, setColor] = useState(colors.white)

  function handleColorChange(color: string): void {
    setColor(color)
  }

  return (
    <div className="shrink-0 w-132 p-4 flex flex-col gap-20">
      <div className="flex flex-col gap-4">
        <h2>COLOR</h2>
        <ColorPicker
          colors={Object.values(colors)}
          activeColor={color}
          onChange={handleColorChange}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h2>EFFECT</h2>
        <EffectList />
      </div>
      <div className="flex flex-col gap-4">
        <h2>SPEED</h2>
        <Slider
          value={speed}
          onChange={setSpeed}
          min={minSpeed}
          max={maxSpeed}
          label={+speed.toFixed(1) + 's'}
        />
      </div>
    </div>
  )
}

export default EffectSection
