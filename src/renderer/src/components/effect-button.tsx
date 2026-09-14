import React from 'react'

export interface EffectItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

interface EffectButtonProps {
  effect: EffectItem
  isActive: boolean
  onPress: () => void
  isShifted?: boolean
}

export const EffectButton: React.FC<EffectButtonProps> = ({
  effect,
  isActive,
  onPress,
  isShifted = false
}) => {
  const IconComponent = effect.icon

  return (
    <button
      type="button"
      onTouchStart={onPress}
      title={effect.label}
      className={`
        relative inline-flex items-center justify-center p-0 bg-transparent border-none cursor-pointer focus:outline-none select-none
        transition-transform duration-200 active:scale-90
        ${isShifted ? 'translate-y-1/2' : 'translate-y-0'}
      `}
    >
      <svg
        width="71"
        height="64"
        viewBox="0 0 71 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M48.6598 2L21.9932 2C20.8241 2.0012 19.6759 2.30981 18.6637 2.89487C17.6515 3.47993 16.811 4.32088 16.2265 5.33334L2.89316 28.6667C2.30804 29.6801 2 30.8298 2 32C2 33.1702 2.30804 34.3199 2.89316 35.3333L16.2265 58.6667C16.811 59.6791 17.6515 60.5201 18.6637 61.1051C19.6759 61.6902 20.8241 61.9988 21.9932 62L48.6598 62C49.8289 61.9988 50.9771 61.6902 51.9893 61.1051C53.0014 60.5201 53.842 59.6791 54.4265 58.6667L67.7598 35.3333C68.345 34.3199 68.653 33.1702 68.653 32C68.653 30.8298 68.345 29.6801 67.7598 28.6667L54.4265 5.33334C53.842 4.32088 53.0014 3.47993 51.9893 2.89487C50.9771 2.30981 49.8289 2.0012 48.6598 2Z"
          fill={isActive ? 'var(--color-neutral-0, #fbfcfe)' : 'transparent'}
          stroke={
            isActive ? 'var(--color-neutral-0, #fbfcfe)' : 'var(--color-neutral-600, #404454)'
          }
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div
        className={`absolute inset-0 flex items-center justify-center ${isActive ? 'text-neutral-900' : 'text-neutral-600'}`}
      >
        <IconComponent />
      </div>
    </button>
  )
}
