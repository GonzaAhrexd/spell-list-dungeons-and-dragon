import { useState } from 'react'

import SpellList from './SpellList'
import { SpendContext } from '../context/spellSpend';
import { useContext } from 'react';
import Consumptions from './Consumptions/Consumptions';
import HeaderApp from './HeaderApp';
import SpellsMenu from './SpellsMenu';

import ChangeCharacter from './ChangeCharacter';
import SelectCharacter from './SelectCharacterPage/SelectCharacter';
import RunesLog from './RunesLog/RunesLog';


function MainPage() {


  const { selectedCharacter } = useContext(SpendContext);

  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [showingSpellList, setShowingSpellList] = useState(false);
  
  const [showSpellsMenu, setShowSpellsMenu] = useState(true);
  const [showConsumptionMenu, setShowConsumptionMenu] = useState(false);
  const [seeSelectCharacter, setSeeSelectCharacter] = useState(selectedCharacter.personaje === "none");

  const [isRunicMode, ] = useState(selectedCharacter.subclase === "Rúnico");

  const [canUseSpells] = useState(selectedCharacter?.limitePotencias );
  const [showRunesSettings, setShowRunesSettings] = useState(false);
  const [showRunesList, setShowRunesList] = useState(false);
  const handleSelectedLevel = (level: string) => {


    setSelectedLevel(level);
    if(!isRunicMode){
      setShowingSpellList(true);
    }else{
      setShowRunesList(true);
    }



  }

  const handleSpellsMenu = () => {
    setShowSpellsMenu(true);
    setShowConsumptionMenu(false);
    setShowRunesSettings(false);
  }

  const handleConsumptionMenu = () => {
    setShowConsumptionMenu(true);
    setShowingSpellList(false);
    setShowSpellsMenu(false);
  }

  const handleRunasLog = () => {
    setShowConsumptionMenu(false);
    setShowingSpellList(false);
    setShowSpellsMenu(false);
    setShowRunesSettings(true);


  }


  return (
 <div className="app-viewport min-h-screen flex items-center justify-center p-4">
        {!seeSelectCharacter &&
          <>
            <main className="mobile-shell w-full max-w-[420px] mx-auto">
              <HeaderApp />
              <div className='flex justify-between'>
                <button className='antiqua-font w-full cursor-pointer mr-1 mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner' onClick={handleSpellsMenu}>{canUseSpells ? "Hechizos" : isRunicMode ? "Runas" : "Habilidades"} </button>
                { canUseSpells && <button className='antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner' onClick={handleConsumptionMenu}>Consumo</button>}
                { isRunicMode && <button className='antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner' onClick={handleRunasLog}>Gestionar runas</button>}
              </div>

              {!showingSpellList && showConsumptionMenu &&
                <Consumptions />
              }
              {!showingSpellList && !showRunesList && showSpellsMenu &&
                <SpellsMenu selectedLevel={selectedLevel} handleSelectedLevel={handleSelectedLevel} />
              }
              {showRunesSettings &&
                <RunesLog />
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