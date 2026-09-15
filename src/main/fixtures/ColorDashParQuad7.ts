import type { LampState } from '@type/lighting'

export interface Fixture {
  renderDmx(state: LampState): number[]
  channelCount: number
}

export class ColorDashParQuad7 implements Fixture {
  public readonly channelCount = 6

  public renderDmx(state: LampState): number[] {
    const dimmer = Math.round((state.dimmer / 100) * 255)

    let amber = 0
    if (state.r > 150 && state.g > 50 && state.b < 50) {
      amber = Math.min(state.r, state.g * 2)
    }

    const strobe = state.strobe ? 255 : 0

    return [dimmer, state.r, state.g, state.b, amber, strobe]
  }
}
