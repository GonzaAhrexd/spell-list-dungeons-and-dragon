import { useEffect, useState } from 'react'
import './App.css'
import SpellList from './components/SpellList'
import { SpendContext, SpendProvider } from './context/spellSpend';
import { useContext } from 'react';
import Consumptions from './components/Consumptions/Consumptions';
import HeaderApp from './components/HeaderApp';
import SpellsMenu from './components/SpellsMenu';

import ChangeCharacter from './components/ChangeCharacter';
import SelectCharacter from './components/SelectCharacterPage/SelectCharacter';
function App() {
  // Niveles: Trucos (Truco), I - VI
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [showingSpellList, setShowingSpellList] = useState(false);

  const [showSpellsMenu, setShowSpellsMenu] = useState(true);
  const [showConsumptionMenu, setShowConsumptionMenu] = useState(false);
  const [seeSelectCharacter, setSeeSelectCharacter] = useState(false);


  // TODO: Detectar si se seleccionó el personaje o no


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
        {!seeSelectCharacter &&
          <>
            <main className="mobile-shell w-full max-w-[420px] mx-auto">
              <HeaderApp />
              <div className='flex justify-between'>
                <button className='w-full cursor-pointer mr-1 mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner' onClick={handleSpellsMenu}>Hechizos</button>
                <button className='w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner' onClick={handleConsumptionMenu}>Consumo</button>
              </div>

              {!showingSpellList && showConsumptionMenu &&
                <Consumptions />
              }
              {!showingSpellList && showSpellsMenu &&
                <SpellsMenu selectedLevel={selectedLevel} handleSelectedLevel={handleSelectedLevel} />
              }

              {showingSpellList &&
                <SpellList level={selectedLevel} onBack={() => { setShowingSpellList(false); setSelectedLevel(null); }} />
              }
              <ChangeCharacter setSeeSelectCharacter={setSeeSelectCharacter} />
            </main>
          </>
        }
        {seeSelectCharacter &&
          <main className="mobile-shell w-full max-w-[420px] mx-auto">
            <SelectCharacter />
          </main>
        }
      </div>
    </SpendProvider>
  )
}

export default App
