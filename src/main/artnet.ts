import dgram from 'dgram'
import type { LampState } from '@type/lighting'
import type { Fixture } from './fixtures/ColorDashParQuad7'

export class ArtNetSender {
  private socket: dgram.Socket
  private host: string
  private port: number = 6454
  private universe: number
  private fixture: Fixture

  constructor(fixture: Fixture, host: string = '127.0.0.1', universe: number = 0) {
    this.fixture = fixture
    this.host = host
    this.universe = universe
    this.socket = dgram.createSocket('udp4')
  }

  public sendFrame(frame: Record<string, LampState>, gridOrder: string[]): void {
    const dmxData = Buffer.alloc(512, 0)

    gridOrder.forEach((id, index) => {
      const lamp = frame[id]
      if (!lamp) return

      const startChannel = index * this.fixture.channelCount

      if (startChannel + this.fixture.channelCount > 512) return

      const channels = this.fixture.renderDmx(lamp)

      for (let i = 0; i < channels.length; i++) {
        dmxData[startChannel + i] = channels[i]
      }
    })

    const packet = this.createArtDmxPacket(dmxData)
    this.socket.send(packet, 0, packet.length, this.port, this.host)
  }

  private createArtDmxPacket(dmxData: Buffer): Buffer {
    const header = Buffer.from([
      0x41,
      0x72,
      0x74,
      0x2d,
      0x4e,
      0x65,
      0x74,
      0x00,
      0x00,
      0x50,
      0x00,
      0x0e,
      0x00,
      0x00,
      this.universe & 0xff,
      (this.universe >> 8) & 0xff,
      (dmxData.length >> 8) & 0xff,
      dmxData.length & 0xff
    ])

    return Buffer.concat([header, dmxData])
  }
}
