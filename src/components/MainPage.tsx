// REACT
import { useState, useContext, useEffect } from 'react'
// Contexto
import { SpendContext } from '../context/spellSpend';
// Componentes
import SpellList from './SpellList'
import Consumptions from './Consumptions/Consumptions';
import HeaderApp from './HeaderApp';
import SpellsMenu from './SpellsMenu';
import ChangeCharacter from './ChangeCharacter';
import SelectCharacter from './SelectCharacterPage/SelectCharacter';
import RunesLog from './RunesLog/RunesLog';
import RunesList from './runesList'
import AdminManager from './AdminManager';

import { pingServer } from '../api/services/ping.routes';
import Swal from 'sweetalert2';

import romanToNumber  from '../functions/RomanToNumber';
import numberToRoman  from '../functions/NumberToRoman';

import getLevels from '../functions/getLevels';
import TiradasModal from './TiradasModal/TiradasModal';

function MainPage() {


  const { selectedCharacter  } = useContext(SpendContext);

  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [showingSpellList, setShowingSpellList] = useState(false);

  const [showSpellsMenu, setShowSpellsMenu] = useState(true);
  const [showConsumptionMenu, setShowConsumptionMenu] = useState(false);
  const [seeSelectCharacter, setSeeSelectCharacter] = useState(selectedCharacter.personaje === "none");
  const [isRunicMode,] = useState(selectedCharacter.subclase === "Rúnico");

  const [canUseSpells] = useState(selectedCharacter?.limitePotencias);
  const [showRunesSettings, setShowRunesSettings] = useState(false);
  const [showRunesList, setShowRunesList] = useState(false);

  const [isTiradasModal, setIsTiradasModal] = useState(false);

  const handleSelectedLevel = (level: string) => {
    setSelectedLevel(level);
    if (!isRunicMode) {
      setShowingSpellList(true);
    } else {
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

  // Haz una verificación del estado del servidor

  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        await pingServer();
        setIsOnline(true);
      } catch {
        setIsOnline(false);
      }
    };

    checkServerStatus();
  }, []);

  const handleServer = () => {
    Swal.fire({
      title: 'Estado del servidor',
      text: isOnline ? 'El servidor está activo y funcionando correctamente. 🟢' : 'El servidor está inactivo, pueden haber retrasos en cargar los hechizos locales, y los hechizos de la base de datos NO están disponibles. 🔴',
      icon: isOnline ? 'success' : 'error',
      confirmButtonText: 'Cerrar',
      background: '#0E090C',
      color: '#f1f5f9',
      customClass: {
        confirmButton: 'antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner',
    }
  })


  const handleTiradas = () => {
    

  }
  }

  const handlePreviousLevel = () => {
    if (selectedLevel) {
      const currentLevelNumber = romanToNumber(selectedLevel);
      console.log(currentLevelNumber)
      if (currentLevelNumber > 1) {
        const previousLevelRoman = numberToRoman(currentLevelNumber - 1);
        setSelectedLevel(previousLevelRoman);
      }else{
        Swal.fire({
          title: 'Nivel mínimo alcanzado',
          text: 'No podés bajar más allá del nivel 1.',
          icon: 'warning',
          confirmButtonText: 'Cerrar',
          background: '#0E090C',
          color: '#f1f5f9',
          customClass: {
            confirmButton: 'antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner',
        }
      })
      }
    }

  }

  const handleNextLevel = () => {
    
    const levelsSpell = getLevels(selectedCharacter);

    const maxLevel = romanToNumber(levelsSpell[levelsSpell.length -1]);

    if (selectedLevel) {
      const currentLevelNumber = romanToNumber(selectedLevel);
      if (currentLevelNumber < maxLevel) {
        const nextLevelRoman = numberToRoman(currentLevelNumber + 1);
        setSelectedLevel(nextLevelRoman);
      }else{
        Swal.fire({
          title: 'Nivel máximo alcanzado',
          text: 'No podés subir más allá del nivel ' + maxLevel,
          icon: 'warning',
          confirmButtonText: 'Cerrar',
          background: '#0E090C',
          color: '#f1f5f9',
          customClass: {
            confirmButton: 'antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner',
        }
      })
      }
  }
  }


  return (
    <div className="app-viewport min-h-screen flex items-center justify-center p-4">
      {selectedCharacter.personaje === "Game Master" && !seeSelectCharacter && 
        <AdminManager setSeeSelectCharacter={setSeeSelectCharacter} />
      }
      {!seeSelectCharacter && selectedCharacter.personaje !== "Game Master" && 
        <>
        {isTiradasModal &&
        
        <TiradasModal onClose={() => setIsTiradasModal(false)} />
        }
          <main className="mobile-shell w-full max-w-[420px] mx-auto">
            <HeaderApp setIsTiradasModal={setIsTiradasModal} />
            
            <div className='flex justify-between'>
              <button className='antiqua-font w-full cursor-pointer mr-1 mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner' onClick={handleSpellsMenu}>{canUseSpells ? "Hechizos" : isRunicMode ? "Runas" : "Habilidades"} </button>
              {canUseSpells && <button className='antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner' onClick={handleConsumptionMenu}>Consumo</button>}
              {isRunicMode && <button className='antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner' onClick={handleRunasLog}>Gestionar runas</button>}
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
            {
              showRunesList && !showRunesSettings &&
              <RunesList level={selectedLevel} onBack={() => { setShowRunesList(false); setSelectedLevel(null); }} />
            }
            {showingSpellList &&
              <SpellList level={selectedLevel} onPreviousLevel={handlePreviousLevel} onNextLevel={handleNextLevel} onBack={() => { setShowingSpellList(false); setSelectedLevel(null); }} />
            }

            <ChangeCharacter setSeeSelectCharacter={setSeeSelectCharacter} />
          <div className='antiqua-font cursor-pointer w-full flex flex-col items-center justify-center rounded-lg border mt-2' onClick={() => handleServer()}>Estado del servidor: {isOnline ? "Activo 🟢" : "Inactivo 🔴"}</div>
          </main>
        </>
      }


      {(seeSelectCharacter ) &&
        <main className="mobile-shell w-full max-w-[420px] mx-auto">
          <SelectCharacter />
        </main>
      }
    </div>

  )
}

export default MainPage