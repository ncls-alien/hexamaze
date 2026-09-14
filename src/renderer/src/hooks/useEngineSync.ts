import { useEffect } from 'react'
import { useLightingStore } from '../stores/useLightingStore'

export function useEngineSync(): void {
  const {
    activeEffectId,
    effectColor,
    effectSpeed,
    backgroundColor,
    backgroundBrightness,
    isFlashActive,
    isBlackoutActive,
    isStrobeActive,
    setLampStates
  } = useLightingStore()

  useEffect(() => {
    if (window.api?.updateEngineConfig) {
      window.api.updateEngineConfig({
        activeEffectId,
        effectColor,
        effectSpeed,
        backgroundColor,
        backgroundBrightness,
        isFlashActive,
        isBlackoutActive,
        isStrobeActive
      })
    }
  }, [
    activeEffectId,
    effectColor,
    effectSpeed,
    backgroundColor,
    backgroundBrightness,
    isFlashActive,
    isBlackoutActive,
    isStrobeActive
  ])

  useEffect(() => {
    if (!window.api?.onLampFrameUpdate) return

    const unsubscribe = window.api.onLampFrameUpdate((frames) => {
      setLampStates(frames)
    })

    return () => unsubscribe()
  }, [setLampStates])
}
