import { useState } from 'react'

interface ActionButtonProps {
  label?: string
  active: boolean
  onTouchStart?: () => void
  onTouchEnd?: () => void
}

function ActionButton({
  label,
  active,
  onTouchStart,
  onTouchEnd
}: ActionButtonProps): React.JSX.Element {
  return (
    <button
      className={`relative px-1.5 py-2.5transition-all duration-100 ${active ? 'scale-110' : 'scale-100'}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <svg
        width="136"
        height="122"
        viewBox="0 0 136 122"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M94.3197 0.999998L40.9863 0.999998C38.6482 1.0024 36.3517 1.61961 34.3274 2.78974C32.3031 3.95986 30.6221 5.64176 29.453 7.66667L2.78633 54.3333C1.61608 56.3603 1 58.6595 1 61C1 63.3405 1.61608 65.6397 2.78633 67.6667L29.453 114.333C30.6221 116.358 32.3031 118.04 34.3274 119.21C36.3517 120.38 38.6482 120.998 40.9863 121L94.3197 121C96.6578 120.998 98.9543 120.38 100.979 119.21C103.003 118.04 104.684 116.358 105.853 114.333L132.52 67.6667C133.69 65.6397 134.306 63.3405 134.306 61C134.306 58.6595 133.69 56.3603 132.52 54.3333L105.853 7.66667C104.684 5.64176 103.003 3.95986 100.979 2.78974C98.9543 1.61961 96.6578 1.0024 94.3197 0.999998Z"
          stroke="url(#paint0_linear_2002_299)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="url(#paint0_linear_2002_299)"
          fillOpacity={active ? '1' : '0'}
        />
        <defs>
          <linearGradient
            id="paint0_linear_2002_299"
            x1="0.652961"
            y1="1"
            x2="134.653"
            y2="121"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF0420" />
            <stop offset="1" stopColor="#FFCB3D" />
          </linearGradient>
        </defs>
      </svg>

      <p className="absolute top-1/2 left-1/2 -translate-1/2 font-semibold text-lg">{label}</p>
    </button>
  )
}

function ActionButtonSection(): React.JSX.Element {
  const [activeActions, setActiveActions] = useState<Record<string, boolean>>({
    FLASH: false,
    STROBE: false,
    BLACKOUT: false
  })

  function handleTouchStart(label: string): void {
    setActiveActions((prev) => ({
      ...prev,
      [label]: true
    }))
  }

  function handleTouchEnd(label: string): void {
    setActiveActions((prev) => ({
      ...prev,
      [label]: false
    }))
  }

  return (
    <div className="flex *:-mx-3! *:odd:mt-36!">
      <ActionButton
        label="FLASH"
        active={activeActions.FLASH}
        onTouchStart={() => handleTouchStart('FLASH')}
        onTouchEnd={() => handleTouchEnd('FLASH')}
      />
      <ActionButton
        label="STROBE"
        active={activeActions.STROBE}
        onTouchStart={() => handleTouchStart('STROBE')}
        onTouchEnd={() => handleTouchEnd('STROBE')}
      />
      <ActionButton
        label="BLACKOUT"
        active={activeActions.BLACKOUT}
        onTouchStart={() => handleTouchStart('BLACKOUT')}
        onTouchEnd={() => handleTouchEnd('BLACKOUT')}
      />
    </div>
  )
}

export default ActionButtonSection
