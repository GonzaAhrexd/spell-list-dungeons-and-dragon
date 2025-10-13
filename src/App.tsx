import { useState } from 'react'
import './App.css'
import SpellList from './components/SpellList'

function App() {
  // Niveles: Trucos (Truco), I - VI
  const levels = ['I', 'II', 'III', 'IV', 'V', 'VI']
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [showingSpellList, setShowingSpellList] = useState(false);



  const handleSelectedLevel = (level: string) => {
    setSelectedLevel(level);
    setShowingSpellList(true);
  }


  return (
    <div className="app-viewport min-h-screen flex items-center justify-center p-4">
      <main className="mobile-shell w-full max-w-[420px] mx-auto">

        <header className="text-center mb-4">
          <h1 className="title">Hechizos</h1>

          <p className="subtitle">Bertok</p>
        </header>
        {!showingSpellList &&         
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

        {showingSpellList && (
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
  )
}

export default App
