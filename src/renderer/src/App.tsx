import EffectSection from './components/effect-section'
import BackgroundSection from './components/background-section'
import HexaGrid from './components/hexagrid'
import LabeledDivider from './components/labeled-divider'
import ActionButtonSection from './components/action-button-section'
import { useEngineSync } from './hooks/useEngineSync'

function App(): React.JSX.Element {
  useEngineSync()

  return (
    <main className="flex flex-row gap-4 p-10 min-h-screen">
      <div className="flex flex-col justify-between">
        <EffectSection />
      </div>
      <LabeledDivider startLabel="EFFECT" />
      <HexaGrid />
      <LabeledDivider startLabel="BACKGROUND" endLabel="ACTIONS" />
      <div className="flex flex-col justify-between items-end">
        <BackgroundSection />
        <ActionButtonSection />
      </div>
    </main>
  )
}

export default App
