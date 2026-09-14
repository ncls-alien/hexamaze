import { create } from 'zustand'
import type { LampState } from '@type/lighting'
import type { RGBColor } from '@renderer/constants/colors'

interface LightingStore {
  activeEffectId: string
  effectColor: RGBColor
  effectSpeed: number

  backgroundColor: RGBColor
  backgroundBrightness: number

  isFlashActive: boolean
  isBlackoutActive: boolean
  isStrobeActive: boolean

  lampStates: Record<string, LampState>

  setActiveEffectId: (id: string) => void
  setEffectColor: (color: RGBColor) => void
  setEffectSpeed: (speed: number) => void

  setBackgroundColor: (color: RGBColor) => void
  setBackgroundBrightness: (brightness: number) => void

  setFlashActive: (active: boolean) => void
  setBlackoutActive: (active: boolean) => void
  setStrobeActive: (active: boolean) => void

  setLampStates: (states: Record<string, LampState>) => void
}

export const useLightingStore = create<LightingStore>((set) => ({
  activeEffectId: 'none',
  effectColor: { r: 255, g: 255, b: 255 },
  effectSpeed: 1.5,

  backgroundColor: { r: 0, g: 255, b: 0 },
  backgroundBrightness: 50,

  isFlashActive: false,
  isBlackoutActive: false,
  isStrobeActive: false,

  lampStates: {},

  setActiveEffectId: (activeEffectId) => set({ activeEffectId }),
  setEffectColor: (effectColor) => set({ effectColor }),
  setEffectSpeed: (effectSpeed) => set({ effectSpeed }),

  setBackgroundColor: (backgroundColor) => set({ backgroundColor }),
  setBackgroundBrightness: (backgroundBrightness) => set({ backgroundBrightness }),

  setFlashActive: (isFlashActive) => set({ isFlashActive }),
  setBlackoutActive: (isBlackoutActive) => set({ isBlackoutActive }),
  setStrobeActive: (isStrobeActive) => set({ isStrobeActive }),

  setLampStates: (lampStates) => set({ lampStates })
}))
