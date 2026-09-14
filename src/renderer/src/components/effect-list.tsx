import { EffectButton, EffectItem } from './effect-button'
import NoEffect from './icons/no-effect'
import Expand from './icons/expand'
import Rotate from './icons/rotate'
import Shrink from './icons/shrink'
import SwipeRight from './icons/swipe-right'
import SwipeLeft from './icons/swipe-left'
import SwipeUp from './icons/swipe-up'
import SwipeDown from './icons/swipe-down'
import { useLightingStore } from '@renderer/stores/useLightingStore'

const EFFECTS_CONFIG: EffectItem[] = [
  { id: 'none', icon: NoEffect },
  { id: 'expand', icon: Expand },
  { id: 'shrink', icon: Shrink },
  { id: 'rotate', icon: Rotate },
  { id: 'swipe-right', icon: SwipeRight },
  { id: 'swipe-left', icon: SwipeLeft },
  { id: 'swipe-up', icon: SwipeUp },
  { id: 'swipe-down', icon: SwipeDown }
]

function EffectList(): React.JSX.Element {
  const activeEffectId = useLightingStore((state) => state.activeEffectId)
  const setActiveEffectId = useLightingStore((state) => state.setActiveEffectId)

  return (
    <div className="flex flex-wrap items-center pb-8">
      {EFFECTS_CONFIG.map((effect, index) => {
        const isShifted = index % 2 === 1

        return (
          <div key={effect.id} className="relative transition-all duration-150 -mr-3! -mb-1!">
            <EffectButton
              effect={effect}
              isActive={activeEffectId === effect.id}
              onPress={() => setActiveEffectId(effect.id)}
              isShifted={isShifted}
            />
          </div>
        )
      })}
    </div>
  )
}

export default EffectList
