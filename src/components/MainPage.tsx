import { useState } from 'react'

import SpellList from './SpellList'
import { SpendContext } from '../context/spellSpend';
import { useContext } from 'react';
import Consumptions from './Consumptions/Consumptions';
import HeaderApp from './HeaderApp';
import SpellsMenu from './SpellsMenu';

import ChangeCharacter from './ChangeCharacter';
import SelectCharacter from './SelectCharacterPage/SelectCharacter';


function MainPage() {


  const { selectedCharacter } = useContext(SpendContext);

  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [showingSpellList, setShowingSpellList] = useState(false);

  const [showSpellsMenu, setShowSpellsMenu] = useState(true);
  const [showConsumptionMenu, setShowConsumptionMenu] = useState(false);
  const [seeSelectCharacter, setSeeSelectCharacter] = useState(selectedCharacter.personaje === "none");


  const [canUseSpells] = useState(selectedCharacter?.limitePotencias );


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
 <div className="app-viewport min-h-screen flex items-center justify-center p-4">
        {!seeSelectCharacter &&
          <>
            <main className="mobile-shell w-full max-w-[420px] mx-auto">
              <HeaderApp />
              <div className='flex justify-between'>
                <button className='antiqua-font w-full cursor-pointer mr-1 mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner' onClick={handleSpellsMenu}>{canUseSpells ? "Hechizos" : "Habilidades"} </button>
                {canUseSpells && 
                <button className='antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner' onClick={handleConsumptionMenu}>Consumo</button>
                }
              
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
        {(seeSelectCharacter)  &&
          <main className="mobile-shell w-full max-w-[420px] mx-auto">
            <SelectCharacter />
          </main>
        }
      </div>

)
}

export default MainPage