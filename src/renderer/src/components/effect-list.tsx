import React, { useState } from 'react'
import { EffectButton, EffectItem } from './effect-button'
import NoEffect from './icons/no-effect'
import Expand from './icons/expand'
import Rotate from './icons/rotate'
import Shrink from './icons/shrink'
import SwipeRight from './icons/swipe-right'
import SwipeLeft from './icons/swipe-left'
import SwipeUp from './icons/swipe-up'
import SwipeDown from './icons/swipe-down'

const EFFECTS_CONFIG: EffectItem[] = [
  { id: 'none', label: 'No Effect', icon: NoEffect },
  { id: 'expand', label: 'Expand', icon: Expand },
  { id: 'shrink', label: 'Shrink', icon: Shrink },
  { id: 'rotate', label: 'Rotate', icon: Rotate },
  { id: 'swipe-right', label: 'Swipe Right', icon: SwipeRight },
  { id: 'swipe-left', label: 'Swipe Left', icon: SwipeLeft },
  { id: 'swipe-up', label: 'Shrink', icon: SwipeUp },
  { id: 'swipe-down', label: 'Rotate', icon: SwipeDown }
]

interface EffectSectionProps {
  onEffectChange?: (effectId: string) => void
}

export const EffectSection: React.FC<EffectSectionProps> = ({ onEffectChange }) => {
  const [activeEffectId, setActiveEffectId] = useState<string>('none')

  const handleSelect = (id: string): void => {
    setActiveEffectId(id)
    if (onEffectChange) {
      onEffectChange(id)
    }
  }

  return (
    <div className="flex flex-wrap items-center pb-8">
      {EFFECTS_CONFIG.map((effect, index) => {
        const isShifted = index % 2 === 1

        return (
          <div key={effect.id} className="relative transition-all duration-150 -mr-3! -mb-1!">
            <EffectButton
              effect={effect}
              isActive={activeEffectId === effect.id}
              onPress={() => handleSelect(effect.id)}
              isShifted={isShifted}
            />
          </div>
        )
      })}
    </div>
  )
}

export default EffectSection
