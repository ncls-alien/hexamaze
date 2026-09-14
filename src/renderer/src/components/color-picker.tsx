import HexaButton from './hexa-button'

interface ColorPickerProps {
  colors: string[]
  activeColor?: string
  onChange: (color: string) => void
}

function ColorPicker({ colors, activeColor, onChange }: ColorPickerProps): React.JSX.Element {
  return (
    <ul className="flex">
      {colors.map((color) => (
        <li key={color} className="-mx-3! even:mt-9!">
          <HexaButton
            color={color}
            active={color === activeColor}
            onPress={() => onChange(color)}
          />
        </li>
      ))}
    </ul>
  )
}

export default ColorPicker
