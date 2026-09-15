import { COLOR_PRESETS } from '@renderer/constants/colors'
import ColorButton from './color-button'
import type { RGBColor } from '@type/lighting'

interface ColorPickerProps {
  activeColor: RGBColor
  onChange: (color: RGBColor) => void
}

function ColorPicker({ activeColor, onChange }: ColorPickerProps): React.JSX.Element {
  return (
    <ul className="flex">
      {COLOR_PRESETS.map((preset) => {
        const isActive =
          activeColor?.r === preset.rgb.r &&
          activeColor?.g === preset.rgb.g &&
          activeColor?.b === preset.rgb.b

        return (
          <li key={preset.id} className="-mx-3! even:mt-9!">
            <ColorButton
              color={preset.hex}
              active={isActive}
              onPress={() => onChange(preset.rgb)}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default ColorPicker
