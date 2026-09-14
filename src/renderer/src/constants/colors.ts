import { ColorPreset, RGBColor } from '@type/lighting'

export function hexToRgb(hex: string): RGBColor {
  const cleanHex = hex.replace('#', '')
  const bigint = parseInt(cleanHex, 16)
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  }
}

export const COLOR_PRESETS: ColorPreset[] = [
  { id: 'white', label: 'White', hex: '#ffffff', rgb: hexToRgb('#ffffff') },
  { id: 'red', label: 'Red', hex: '#ff0000', rgb: hexToRgb('#ff0000') },
  { id: 'amber', label: 'Amber', hex: '#ff7f00', rgb: hexToRgb('#ff7f00') },
  { id: 'yellow', label: 'Yellow', hex: '#ffff00', rgb: hexToRgb('#ffff00') },
  { id: 'green', label: 'Green', hex: '#00ff00', rgb: hexToRgb('#00ff00') },
  { id: 'cyan', label: 'Cyan', hex: '#00ffff', rgb: hexToRgb('#00ffff') },
  { id: 'blue', label: 'Blue', hex: '#0000ff', rgb: hexToRgb('#0000ff') },
  { id: 'pink', label: 'Pink', hex: '#ff00ff', rgb: hexToRgb('#ff00ff') }
]
