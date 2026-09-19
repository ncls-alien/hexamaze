import Forwards from './icons/forwards'
import Backwards from './icons/backwards'
import Bounce from './icons/bounce'
import { useLightingStore } from '@renderer/stores/useLightingStore'
import HexCap from './hexcap'
import { useState } from 'react'

interface DirectionItem {
  id: string
  icon: React.ComponentType<{ className?: string }>
}

const DIRECTIONS_CONFIG: DirectionItem[] = [
  { id: 'forwards', icon: Forwards },
  { id: 'backwards', icon: Backwards },
  { id: 'bounce', icon: Bounce }
]

function DirectionThumb({ offset }: { offset: number }): React.JSX.Element {
  return (
    <div
      className="absolute top-0 w-full flex flex-row transition-all ease-in-out duration-200"
      style={{ left: `calc(${offset}%)` }}
    >
      <HexCap className="shrink-0 -scale-x-100" filled />
      <div
        className="bg-current"
        style={{ width: `calc(100% / ${DIRECTIONS_CONFIG.length} - 68px)` }}
      ></div>
      <HexCap className="shrink-0" filled />
    </div>
  )
}

function DirectionContainer(): React.JSX.Element {
  return (
    <div className="flex flex-row">
      <HexCap className="shrink-0 text-neutral-600 -scale-x-100" />
      <div className="grow border-y-2 border-neutral-600"></div>
      <HexCap className="shrink-0 text-neutral-600" />
    </div>
  )
}

function EffectDirection(): React.JSX.Element {
  const effectDirection = useLightingStore((state) => state.effectDirection)
  const setEffectDirection = useLightingStore((state) => state.setEffectDirection)
  const [thumbOffset, setThumbOffset] = useState(0)

  return (
    <div className="relative">
      <DirectionContainer />
      <DirectionThumb offset={thumbOffset} />
      <div className="absolute top-0 left-0 w-full h-full flex flex-row">
        {DIRECTIONS_CONFIG.map((direction, index) => {
          const IconComponent = direction.icon

          return (
            <div
              className={`flex-1 flex items-center justify-center ${direction.id === effectDirection ? 'text-neutral-900' : 'text-neutral-600'}`}
              key={index}
              onTouchStart={() => {
                setEffectDirection(direction.id)
                setThumbOffset((index / DIRECTIONS_CONFIG.length) * 100)
              }}
            >
              <IconComponent className="w-full h-full" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default EffectDirection
