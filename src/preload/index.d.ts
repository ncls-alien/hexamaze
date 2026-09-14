import { ElectronAPI } from '@electron-toolkit/preload'
import { LampState } from '../types/lighting'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      updateEngineConfig: (config: Record<string, unknown>) => void
      onLampFrameUpdate: (callback: (frames: Record<string, LampState>) => void) => () => void
    }
  }
}
