export interface LampState {
  r: number
  g: number
  b: number
  dimmer: number
  strobe: boolean
}

export interface EngineConfig {
  activeEffectId: string
  effectSpeed: number
  effectColor: { r: number; g: number; b: number }
  backgroundColor: { r: number; g: number; b: number }
  backgroundBrightness: number
}
