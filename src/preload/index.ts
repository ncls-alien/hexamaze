import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  updateEngineConfig: (config: Record<string, unknown>): void => {
    ipcRenderer.send('update-engine-config', config)
  },
  onLampFrameUpdate: (callback: (frames: Record<string, unknown>) => void): (() => void) => {
    const subscription = (_event: unknown, frames: Record<string, unknown>): void =>
      callback(frames)
    ipcRenderer.on('lamp-frame-update', subscription)

    // Return Cleanup Function
    return () => {
      ipcRenderer.removeListener('lamp-frame-update', subscription)
    }
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
