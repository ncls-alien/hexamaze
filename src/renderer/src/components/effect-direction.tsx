import { EffectButton, EffectItem } from './effect-button'
import Forwards from './icons/forwards'
import Backwards from './icons/backwards'
import Bounce from './icons/bounce'
import { useLightingStore } from '@renderer/stores/useLightingStore'

const DIRECTIONS_CONFIG: EffectItem[] = [
  { id: 'forwards', icon: Forwards },
  { id: 'backwards', icon: Backwards },
  { id: 'bounce', icon: Bounce }
]

function EffectDirection(): React.JSX.Element {
  const effectDirection = useLightingStore((state) => state.effectDirection)
  const setEffectDirection = useLightingStore((state) => state.setEffectDirection)

  return (
    <div className="flex flex-wrap items-center pb-8">
      {DIRECTIONS_CONFIG.map((direction, index) => {
        const isShifted = index % 2 === 1

        return (
          <div key={direction.id} className="relative transition-all duration-150 -mr-3! -mb-1!">
            <EffectButton
              effect={direction}
              isActive={effectDirection === direction.id}
              onPress={() => setEffectDirection(direction.id)}
              isShifted={isShifted}
            />
          </div>
        )
      })}
    </div>
  )
}

export default EffectDirection
