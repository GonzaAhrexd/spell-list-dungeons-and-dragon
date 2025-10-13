import { useState } from 'react'
import './App.css'
import SpellList from './components/SpellList'
import { SpendProvider } from './context/spellSpend';
import Consumptions from './components/Consumptions';

function App() {
  // Niveles: Trucos (Truco), I - VI
  const levels = ['I', 'II', 'III', 'IV', 'V', 'VI']
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [showingSpellList, setShowingSpellList] = useState(false);

  const [showSettings, setShowSettings] = useState(false);
  const [showSpellsMenu, setShowSpellsMenu] = useState(true);
  const [showConsumptionMenu, setShowConsumptionMenu] = useState(false);

  const handleSelectedLevel = (level: string) => {
    setSelectedLevel(level);
    setShowingSpellList(true);
  }

  const handleSpellsMenu = () => {
    setShowSpellsMenu(true);
    setShowConsumptionMenu(false);
  }

  const handleConsumptionMenu = () => {
    setShowConsumptionMenu(true);
    setShowingSpellList(false);
    setShowSpellsMenu(false);
  }

  return (
    <SpendProvider>
      <div className="app-viewport min-h-screen flex items-center justify-center p-4">
        <main className="mobile-shell w-full max-w-[420px] mx-auto">

          <header className="text-center mb-4">

           
            <div className='flex justify-around items-center'>
              <h1 className="title">Hechizos</h1>
              {/* <button onClick={() => setShowSettings(!showSettings)}>⚙️</button> */}
            </div>
            <p className="subtitle">Bertok</p>

          
          </header>
          { 
          <div className='flex justify-between'>
            {/* Pone dos botones, uno de  hechizos y otro de  consumo */}
            <button className='w-full mr-1 mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-medium shadow-inner' onClick={handleSpellsMenu}>Hechizos</button>
            <button className='w-full mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-medium shadow-inner' onClick={handleConsumptionMenu}>Consumo</button>
          </div>
          }


    
          {!showingSpellList && !showSettings && showConsumptionMenu &&
            <section className="parchment p-4">

              <Consumptions />
            </section>

          }

          {!showingSpellList && !showSettings && showSpellsMenu &&
            <section className="parchment p-4">



              <button
                key={"Trucos"}
                onClick={() => handleSelectedLevel("Trucos")}
                className={`w-full mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-medium shadow-inner
                  ${selectedLevel === "Trucos" ? 'selected' : ''}`}
                aria-pressed={selectedLevel === "Trucos"}
              >
                <span className="level-label">Trucos</span>
                <span className="level-rune" aria-hidden>✦</span>
              </button>
              <div className="levels grid grid-cols-2 gap-3">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => handleSelectedLevel(level)}
                    className={`level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-medium shadow-inner
                  ${selectedLevel === level ? 'selected' : ''}`}
                    aria-pressed={selectedLevel === level}
                  >
                    <span className="level-label">{level}</span>
                    <span className="level-rune" aria-hidden>✦</span>
                  </button>
                ))}
              </div>
            </section>
          }

          {showingSpellList && !showSettings && (
            <section className="parchment p-4 mt-4">
              <SpellList
                level={selectedLevel}
                onBack={() => {
                  setShowingSpellList(false);
                  setSelectedLevel(null);
                }}
              />
            </section>
          )}


        </main>
      </div>
    </SpendProvider>
  )
}

export default App
