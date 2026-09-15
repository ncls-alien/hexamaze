import { EffectButton, EffectItem } from './effect-button'
import NoEffect from './icons/no-effect'
import Pulse from './icons/pulse'
import Rotate from './icons/rotate'
import Sparkle from './icons/sparkle'
import SwipeHorizontal from './icons/swipe-horizontal'
import SwipeVertical from './icons/swipe-vertical'
import Wave from './icons/wave'
import { useLightingStore } from '@renderer/stores/useLightingStore'

const EFFECTS_CONFIG: EffectItem[] = [
  { id: 'none', icon: NoEffect },
  { id: 'pulse', icon: Pulse },
  { id: 'rotate', icon: Rotate },
  { id: 'swipe-horizontal', icon: SwipeHorizontal },
  { id: 'swipe-vertical', icon: SwipeVertical },
  { id: 'sparkle', icon: Sparkle },
  { id: 'wave', icon: Wave }
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
