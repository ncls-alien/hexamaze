export interface LampState {
  r: number
  g: number
  b: number
  dimmer: number
  strobe: boolean
}

export interface EngineConfig {
  activeEffectId: string
  effectColor: { r: number; g: number; b: number }
  effectSpeed: number
  backgroundColor: { r: number; g: number; b: number }
  backgroundBrightness: number
  isFlashActive: boolean
  isBlackoutActive: boolean
  isStrobeActive: boolean
}

export interface RGBColor {
  r: number
  g: number
  b: number
}

export interface ColorPreset {
  id: string
  label: string
  hex: string
  rgb: RGBColor
}
