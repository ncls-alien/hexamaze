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

  // Art-Net Protocol Specification
  // ArtDmx packet
  // Source: https://art-net.org.uk/downloads/art-net.pdf Page 63 and following
  private createArtDmxPacket(dmxData: Buffer): Buffer {
    const header = Buffer.alloc(18)

    header.write('Art-Net\0', 0, 'ascii')
    // OpCode
    // 0x5000: OpDmx
    // Source: https://art-net.org.uk/downloads/art-net.pdf Page 20
    header.writeUInt16LE(0x5000, 8)
    // Protocol Version 14 (Art-Net IV)
    header.writeUInt16BE(14, 10)
    // Sequence
    // 0x00: disabled
    header[12] = 0x00
    // Physical Port
    header[13] = 0x00
    header.writeUInt16LE(this.universe, 14)
    header.writeUInt16BE(dmxData.length, 16)

    return Buffer.concat([header, dmxData])
  }
}
