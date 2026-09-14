import { useRef, useState } from 'react'

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
      <svg
        width="34"
        height="62"
        viewBox="0 0 34 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M0 31C0 29.6557 0.353972 28.3354 1.02539 27.1709L14.3584 3.83691L14.3604 3.83301C15.0325 2.66884 15.9993 1.70208 17.1631 1.0293C18.3271 0.356476 19.6477 0.00138092 20.9922 0L34.3252 0L34.3252 62L20.9922 62L20.7402 61.9961C19.4832 61.9535 18.2543 61.6015 17.1631 60.9707C15.9993 60.2979 15.0325 59.3312 14.3604 58.167L14.3584 58.1631L1.02539 34.8291C0.353972 33.6646 0 32.3443 0 31Z"
          fill="currentColor"
        />
      </svg>
      <div className="grow bg-current"></div>
      <svg
        width="34"
        height="62"
        viewBox="0 0 34 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 rotate-180"
      >
        <path
          d="M0 31C0 29.6557 0.353972 28.3354 1.02539 27.1709L14.3584 3.83691L14.3604 3.83301C15.0325 2.66884 15.9993 1.70208 17.1631 1.0293C18.3271 0.356476 19.6477 0.00138092 20.9922 0L34.3252 0L34.3252 62L20.9922 62L20.7402 61.9961C19.4832 61.9535 18.2543 61.6015 17.1631 60.9707C15.9993 60.2979 15.0325 59.3312 14.3604 58.167L14.3584 58.1631L1.02539 34.8291C0.353972 33.6646 0 32.3443 0 31Z"
          fill="currentColor"
        />
      </svg>
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
      <svg
        width="35"
        height="62"
        viewBox="0 0 35 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M34.9961 31.252C34.9539 32.5088 34.5959 33.7374 33.9541 34.8291L20.3594 58.1631L20.3574 58.167C19.672 59.3312 18.6857 60.2979 17.499 60.9707C16.3122 61.6434 14.9655 61.9986 13.5947 62L7.39343e-07 62L7.15493e-07 60L14.0059 60C14.9996 59.999 15.9756 59.7366 16.8359 59.2393C17.6961 58.742 18.4104 58.0274 18.9072 57.167L18.9082 57.167L32.2383 33.8369L32.2412 33.833C32.7384 32.9717 33 31.9945 33 31C33 30.0055 32.7384 29.0283 32.2412 28.167L32.2383 28.1631L18.9082 4.83203L18.9072 4.83301C18.4104 3.97261 17.6961 3.25797 16.8359 2.76074C15.9756 2.26345 14.9996 2.00103 14.0059 2L2.38498e-08 2L0 4.17371e-07L13.5947 2.55255e-07L13.8516 0.0039065C15.1332 0.0465105 16.3865 0.398675 17.499 1.0293C18.6857 1.70208 19.672 2.66884 20.3574 3.83301L20.3594 3.83691L33.9541 27.1709C34.5959 28.2626 34.9539 29.4912 34.9961 30.748C34.9989 30.8319 35 30.9159 35 31C35 31.0841 34.9989 31.1681 34.9961 31.252Z"
          className="fill-neutral-600"
        />
      </svg>
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

  const range = max - min
  const normalizedValue = Math.max(min, Math.min(max, value))
  const percentage = range > 0 ? ((normalizedValue - min) / range) * 100 : 0

  const updateValueFromTouch = (clientX: number): void => {
    if (!sliderRef.current) return

    const { left, width } = sliderRef.current.getBoundingClientRect()
    if (width === 0) return

    const rawPercentage = Math.max(0, Math.min(1, (clientX - left) / width))

    const newValue = min + rawPercentage * range
    onChange(newValue)
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>): void => {
    setIsActive(true)
    updateValueFromTouch(event.touches[0].clientX)
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>): void => {
    if (!isActive) return
    updateValueFromTouch(event.touches[0].clientX)
  }

  const handleTouchEnd = (): void => {
    setIsActive(false)
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
