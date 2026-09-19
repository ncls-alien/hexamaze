import { useRef, useState } from 'react'
import HexCap from './hexcap'

interface SliderThumbProps {
  percentage: number
  label?: string
}

function SliderThumb({ percentage, label }: SliderThumbProps): React.JSX.Element {
  return (
    <div
      className="absolute left-0 top-0 flex flex-row"
      style={{ width: `calc(${percentage}% + 68px - (${percentage} / 100) * 68px)` }}
    >
      <HexCap className="shrink-0 -scale-x-100" filled />
      <div className="grow bg-current"></div>
      <HexCap className="shrink-0" filled />
      {label && (
        <p className="absolute right-8 top-1/2 translate-x-1/2 -translate-y-1/2 text-neutral-900 font-semibold text-lg">
          {label}
        </p>
      )}
    </div>
  )
}

function SliderTrack(): React.JSX.Element {
  return (
    <div className="flex flex-row pl-4">
      <div className="grow border-y-2 border-neutral-600"></div>
      <HexCap className="shrink-0 text-neutral-600" />
    </div>
  )
}

interface SliderProps {
  value: number
  onChange: (value: number) => void
  label?: string
  min?: number
  max?: number
}

function Slider({ value, onChange, label, min = 0, max = 100 }: SliderProps): React.JSX.Element {
  const [isActive, setIsActive] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const touchStartXRef = useRef<number | null>(null)
  const initialValueRef = useRef<number>(value)

  const range = max - min
  const normalizedValue = Math.max(min, Math.min(max, value))
  const percentage = range > 0 ? ((normalizedValue - min) / range) * 100 : 0

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>): void => {
    const touch = event.targetTouches[0]
    if (!touch) return

    setIsActive(true)
    touchStartXRef.current = touch.clientX
    initialValueRef.current = value
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>): void => {
    if (!isActive || touchStartXRef.current === null || !sliderRef.current) return

    const touch = event.targetTouches[0]
    if (!touch) return

    const currentX = touch.clientX
    const trackWidth = sliderRef.current.offsetWidth
    if (trackWidth === 0) return

    const deltaX = currentX - touchStartXRef.current
    const deltaValue = (deltaX / trackWidth) * range
    const newValue = initialValueRef.current + deltaValue

    onChange(Math.max(min, Math.min(max, newValue)))
  }

  const handleTouchEnd = (): void => {
    setIsActive(false)
    touchStartXRef.current = null
  }

  return (
    <div
      ref={sliderRef}
      className="relative select-none touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <SliderThumb percentage={Math.round(percentage)} label={label} />
      <SliderTrack />
    </div>
  )
}

export default Slider
