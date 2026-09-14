import { useState } from 'react'
import ColorPicker from './color-picker'
import Slider from './slider'

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

function BackgroundSection(): React.JSX.Element {
  const [brightness, setBrightness] = useState(50)
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
        <h2>BRIGHTNESS</h2>
        <Slider value={brightness} onChange={setBrightness} label={Math.round(brightness) + '%'} />
      </div>
    </div>
  )
}

export default BackgroundSection
