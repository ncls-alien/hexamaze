import type { EngineConfig, LampState, RGBColor } from '@type/lighting'

export class FxEngine {
  private config: EngineConfig = {
    activeEffectId: 'none',
    effectColor: { r: 255, g: 0, b: 255 },
    effectSpeed: 1.5,
    backgroundColor: { r: 15, g: 23, b: 42 },
    backgroundBrightness: 20,
    isFlashActive: false,
    isBlackoutActive: false,
    isStrobeActive: false
  }

  // Für phasen-kontinuierliche Speed-Änderungen
  private lastFrameTime: number = Date.now()
  private phase: number = 0
  private lastEffectId: string = 'none' // <-- NEU: Merkt sich den vorherigen Effekt

  public updateConfig(newConfig: Partial<EngineConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }

  public renderFrame(): Record<string, LampState> {
    const frame: Record<string, LampState> = {}

    const now = Date.now()
    const deltaTime = (now - this.lastFrameTime) / 1000
    this.lastFrameTime = now

    // OVERRIDE: Blackout
    if (this.config.isBlackoutActive) {
      return this.generateEmptyFrame()
    }

    // <-- NEU: Wenn der Effekt gewechselt wurde, Phase auf 0 zurücksetzen
    if (this.config.activeEffectId !== this.lastEffectId) {
      this.phase = 0
      this.lastEffectId = this.config.activeEffectId
    }

    const speed = Math.max(0.1, this.config.effectSpeed)
    this.phase += deltaTime * speed

    const bgDimmerFactor = this.config.backgroundBrightness / 100
    const effectiveBgColor: RGBColor = {
      r: Math.round(this.config.backgroundColor.r * bgDimmerFactor),
      g: Math.round(this.config.backgroundColor.g * bgDimmerFactor),
      b: Math.round(this.config.backgroundColor.b * bgDimmerFactor)
    }

    // Durch alle 61 Waben iterieren (-4 bis 4)
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

        const fxIntensity = this.calculateEffect(this.config.activeEffectId, q, r, this.phase)

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
      case 'expand': {
        const radius = (phase * 3) % 4.5
        const diff = Math.abs(distFromCenter - radius)
        return diff < 1.0 ? 1.0 - diff : 0
      }

      case 'shrink': {
        const radius = 4.5 - ((phase * 3) % 4.5)
        const diff = Math.abs(distFromCenter - radius)
        return diff < 1.0 ? 1.0 - diff : 0
      }

      case 'swipe-right': {
        const wave = Math.sin(phase * 4 - (q + 4) * 0.6 - Math.PI / 2)
        return wave > 0.3 ? (wave - 0.3) / 0.7 : 0
      }

      case 'swipe-left': {
        const wave = Math.sin(phase * 4 - (4 - q) * 0.6 - Math.PI / 2)
        return wave > 0.3 ? (wave - 0.3) / 0.7 : 0
      }

      case 'swipe-down': {
        const y = r + q * 0.5
        const wave = Math.sin(phase * 4 - (y + 4) * 0.6 - Math.PI / 2)
        return wave > 0.3 ? (wave - 0.3) / 0.7 : 0
      }

      case 'swipe-up': {
        const y = r + q * 0.5
        const wave = Math.sin(phase * 4 - (4 - y) * 0.6 - Math.PI / 2)
        return wave > 0.3 ? (wave - 0.3) / 0.7 : 0
      }

      case 'rotate': {
        if (q === 0 && r === 0) return 1.0

        const angle = Math.atan2(r, q)
        const normalizedAngle = (angle + Math.PI) / (2 * Math.PI)
        const sweep = (phase * 0.8) % 1.0

        const diff = (sweep - normalizedAngle + 1.0) % 1.0

        const tailLength = 0.5
        return diff < tailLength ? 1.0 - diff / tailLength : 0
      }

      case 'none':
      default:
        return 0
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
