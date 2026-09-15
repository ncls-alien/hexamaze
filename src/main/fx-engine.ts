import type { EngineConfig, LampState, RGBColor } from '@type/lighting'

export class FxEngine {
  private config: EngineConfig = {
    activeEffectId: 'none',
    effectColor: { r: 255, g: 0, b: 255 },
    effectDirection: 'forward',
    effectSpeed: 1,
    backgroundColor: { r: 15, g: 23, b: 42 },
    backgroundBrightness: 20,
    isFlashActive: false,
    isBlackoutActive: false,
    isStrobeActive: false
  }

  private lastFrameTime: number = Date.now()
  private phase: number = 0
  private lastEffectId: string = 'none'

  public updateConfig(newConfig: Partial<EngineConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }

  public renderFrame(): Record<string, LampState> {
    const frame: Record<string, LampState> = {}

    const now = Date.now()
    const deltaTime = (now - this.lastFrameTime) / 1000
    this.lastFrameTime = now

    if (this.config.isBlackoutActive) {
      return this.generateEmptyFrame()
    }

    if (this.config.activeEffectId !== this.lastEffectId) {
      this.phase = 0
      this.lastEffectId = this.config.activeEffectId
    }

    let speed = Math.max(0.1, this.config.effectSpeed)

    if (this.config.effectDirection === 'bounce') {
      speed *= 0.5
    }

    this.phase = (this.phase + deltaTime * speed) % 1.0
    const effectivePhase = this.getEffectivePhase(this.phase, this.config.effectDirection)

    const bgDimmerFactor = this.config.backgroundBrightness / 100
    const effectiveBgColor: RGBColor = {
      r: Math.round(this.config.backgroundColor.r * bgDimmerFactor),
      g: Math.round(this.config.backgroundColor.g * bgDimmerFactor),
      b: Math.round(this.config.backgroundColor.b * bgDimmerFactor)
    }

    for (let q = -4; q <= 4; q++) {
      for (let r = -4; r <= 4; r++) {
        if (Math.abs(q + r) > 4) continue

        const id = `${q},${r}`

        const strobe = this.config.isStrobeActive

        if (this.config.isFlashActive) {
          frame[id] = {
            r: 255,
            g: 255,
            b: 255,
            dimmer: 100,
            strobe: strobe
          }
          continue
        }

        const fxIntensity = this.calculateEffect(this.config.activeEffectId, q, r, effectivePhase)

        const finalColor = this.lerpColor(effectiveBgColor, this.config.effectColor, fxIntensity)

        const finalDimmer = Math.round(
          Math.max(this.config.backgroundBrightness, fxIntensity * 100)
        )

        frame[id] = {
          r: finalColor.r,
          g: finalColor.g,
          b: finalColor.b,
          dimmer: finalDimmer,
          strobe: strobe
        }
      }
    }

    return frame
  }

  private calculateEffect(effectId: string, q: number, r: number, phase: number): number {
    const distFromCenter = (Math.abs(q) + Math.abs(r) + Math.abs(-q - r)) / 2

    switch (effectId) {
      case 'pulse': {
        const waveWidth = 1.5
        const radius = phase * 5.5
        const diff = Math.abs(distFromCenter - radius)
        return diff < waveWidth ? (waveWidth - diff) / waveWidth : 0
      }

      case 'swipe-horizontal': {
        const waveWidth = 2.5
        const position = -5.5 + phase * 11
        const diff = Math.abs(q - position)
        return diff < waveWidth ? (waveWidth - diff) / waveWidth : 0
      }

      case 'swipe-vertical': {
        const waveWidth = 2.5
        const yPos = r + q * 0.5
        const position = 5.5 - phase * 11
        const diff = Math.abs(yPos - position)
        return diff < waveWidth ? (waveWidth - diff) / waveWidth : 0
      }

      case 'rotate': {
        if (q === 0 && r === 0) return 1.0

        const angle = Math.atan2(r, q)
        const normalizedAngle = (angle + Math.PI) / (2 * Math.PI)

        const diff = (phase - normalizedAngle + 1.0) % 1.0

        const tailLength = 0.4
        return diff < tailLength ? 1.0 - diff / tailLength : 0
      }

      case 'sparkle': {
        const angle = phase * Math.PI * 2

        const seed = Math.sin(q * 12.9898 + r * 78.233) * 43758.5453
        const offset = (seed - Math.floor(seed)) * Math.PI * 2

        const wave = Math.sin(angle + offset)

        const threshold = 0.6

        if (wave > threshold) {
          const intensity = (wave - threshold) / (1.0 - threshold)
          return Math.pow(intensity, 2)
        }

        return 0
      }

      case 'wave': {
        const noiseX = Math.sin(q * 0.8 + phase * Math.PI * 2)
        const noiseY = Math.cos(r * 0.8 + phase * Math.PI * 2)
        const combined = (noiseX + noiseY) / 2

        const val = (combined + 1) / 2
        return Math.pow(val, 2)
      }

      case 'none':
      default:
        return 0
    }
  }

  private getEffectivePhase(basePhase: number, direction: string): number {
    switch (direction) {
      case 'backwards':
        return 1.0 - basePhase

      case 'bounce': {
        return basePhase < 0.5 ? basePhase * 2 : (1.0 - basePhase) * 2
      }

      case 'forwards':
      default:
        return basePhase
    }
  }

  public renderTestFrame(gridOrder: string[]): Record<string, LampState> {
    const frame: Record<string, LampState> = {}

    const activeIndex = Math.floor(Date.now() / 150) % gridOrder.length

    gridOrder.forEach((id, index) => {
      if (index === activeIndex) {
        if (index === 0) {
          frame[id] = { r: 0, g: 255, b: 0, dimmer: 100, strobe: false }
        } else if (index === gridOrder.length - 1) {
          frame[id] = { r: 255, g: 0, b: 0, dimmer: 100, strobe: false }
        } else {
          frame[id] = { r: 255, g: 255, b: 255, dimmer: 100, strobe: false }
        }
      } else {
        frame[id] = { r: 0, g: 0, b: 0, dimmer: 0, strobe: false }
      }
    })

    return frame
  }

  private lerpColor(c1: RGBColor, c2: RGBColor, factor: number): RGBColor {
    return {
      r: Math.round(c1.r + (c2.r - c1.r) * factor),
      g: Math.round(c1.g + (c2.g - c1.g) * factor),
      b: Math.round(c1.b + (c2.b - c1.b) * factor)
    }
  }

  private generateEmptyFrame(): Record<string, LampState> {
    const frame: Record<string, LampState> = {}
    for (let q = -4; q <= 4; q++) {
      for (let r = -4; r <= 4; r++) {
        if (Math.abs(q + r) > 4) continue
        frame[`${q},${r}`] = { r: 0, g: 0, b: 0, dimmer: 0, strobe: false }
      }
    }
    return frame
  }
}
