import { useMemo } from 'react'
import Lamp from './lamp'
import { useLightingStore } from '@renderer/stores/useLightingStore'

interface LampUnit {
  id: string
  q: number
  r: number
  x: number
  y: number
  dist: number
}

function HexaGrid(): React.JSX.Element {
  const lampStates = useLightingStore((s) => s.lampStates)

  const HEX_WIDTH = 66
  const GAP = 5
  const GRID_RADIUS = 5

  const centerDistance = HEX_WIDTH + GAP

  const gridUnits = useMemo(() => {
    const units: LampUnit[] = []

    for (let q = -GRID_RADIUS + 1; q < GRID_RADIUS; q++) {
      const r1 = Math.max(-GRID_RADIUS + 1, -q - GRID_RADIUS + 1)
      const r2 = Math.min(GRID_RADIUS - 1, -q + GRID_RADIUS - 1)

      for (let r = r1; r <= r2; r++) {
        const id = `${q},${r}`
        const dist = Math.max(Math.abs(q), Math.abs(r), Math.abs(-q - r))

        const x = (Math.sqrt(3) / 2) * centerDistance * q
        const y = centerDistance * (r + q / 2)

        units.push({ id, q, r, x, y, dist })
      }
    }
    return units
  }, [centerDistance])

  const viewWidth = 520
  const viewHeight = 520

  return (
    <div className="w-full h-full flex items-center self-center justify-center p-12">
      <svg
        viewBox={`${-viewWidth / 2} ${-viewHeight / 2} ${viewWidth} ${viewHeight}`}
        className="w-full h-full object-contain overflow-visible"
      >
        {gridUnits.map((unit) => {
          const state = lampStates?.[unit.id]

          return (
            <Lamp
              key={unit.id}
              x={unit.x}
              y={unit.y}
              r={state?.r ?? 0}
              g={state?.g ?? 0}
              b={state?.b ?? 0}
              dimmer={state?.dimmer ?? 0}
              strobe={state?.strobe ?? false}
              onTouchStart={() => console.log('Touch Start:', unit.id)}
              onTouchEnd={() => console.log('Touch End:', unit.id)}
            />
          )
        })}
      </svg>
    </div>
  )
}

export default HexaGrid
