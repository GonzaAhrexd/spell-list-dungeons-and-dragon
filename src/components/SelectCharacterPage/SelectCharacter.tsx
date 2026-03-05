import personajes from '../../jsons/CharactersList.json'
import { useState, useEffect } from 'react';
import DropdownMenu from './DropdownMenu';
import { useContext } from 'react';
import { SpendContext } from '../../context/spellSpend'
import Swal from 'sweetalert2';
import { checkPass } from '../../api/services/pass.routes';
import GameMasterButton from '../GameMasterButton/GameMasterButton';

type limitePotencias = {
  "1": number | string;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  "6": number;
}

type Personaje = {
  jugador: string;
  grupo: string;
  personaje: string;
  clase: string;
  subclase: string;
  limitePotencias: limitePotencias;
}

function SelectCharacter() {

  const characterList: Personaje[] = personajes.personajes as Personaje[];

  // Haz que se ordene por el grupo alfabeticamente ( A primero, B segundo)
  characterList.sort((a, b) => a.grupo.localeCompare(b.grupo));

  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const { handleSelectCharacter, resetSpells } = useContext(SpendContext);

  const [grupo, setGrupo] = useState<string>("");
  useEffect(() => {
    if (openGroup) {
      resetSpells();
    }
  }, [openGroup]);

  const handleSelection = (char: String) => {

    handleSelectCharacter(char.toString());
    setOpenGroup(null); // Close the dropdown after selection
    window.location.reload();
  }


  const showGameMaster = () => {
    Swal.fire({
      title: 'Game Master',
      // Haz un input donde tenga que poner una contraseña 
      input: 'password',
      // inputLabel: 'Introduce la contraseña para acceder como Game Master',
      inputPlaceholder: 'Contraseña',
      showCancelButton: true,
      confirmButtonText: 'Acceder',
      cancelButtonText: 'Cancelar',
      background: '#0E090C',
      color: '#f1f5f9',
      customClass: {
        confirmButton: 'antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner',
        cancelButton: 'antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner',
      }

    }).then((result) => {
      if (result.isConfirmed) {
        const password = result.value;
        checkPass(password).then(() => {
          Swal.fire({
            title: 'Acceso concedido',
            text: 'Ya podés acceder como Game Master. 🟢',
            icon: 'success',
            confirmButtonText: 'Cerrar',
            background: '#0E090C',
            color: '#f1f5f9',
            customClass: {
              confirmButton: 'antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner'
          }}).then(() => {
            handleSelectCharacter('Game Master');
            window.location.reload();
          });

        }).catch(() => {
          Swal.fire(
            {
              title: 'Acceso denegado',
              text: 'Contraseña incorrecta. 🔴',
              icon: 'error',
              confirmButtonText: 'Cerrar',
              background: '#0E090C',
              color: '#f1f5f9',
              customClass: {
                confirmButton: 'antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner'  
            }}
          );
        });
      }
    }

    )
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center px-4 py-8 relative z-10">

      <div className="w-full max-w-[380px] mx-auto relative">
        
        {/* Título principal */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 
          text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600
          drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]
          tracking-wide leading-tight">
          Selecciona tu<br/>personaje
        </h2>

        {/* Grid de grupos */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {Array.from(new Set(characterList.map(char => char.grupo))).map(grupoItem => (
            <div
              key={grupoItem}
              onClick={() => {
                setOpenGroup(openGroup === grupoItem ? null : grupoItem);
                setGrupo(grupoItem);
              }}
              className={`
                relative cursor-pointer
                aspect-[3/4] rounded-lg
                bg-gradient-to-b from-stone-800/50 via-stone-900/40 to-stone-950/50
                backdrop-blur-sm
                border-2 border-amber-900/60
                shadow-[0_8px_24px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]
                transition-all duration-200 ease-out
                hover:scale-105 hover:shadow-[0_12px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(202,163,74,0.15)]
                hover:border-amber-700/80
                active:scale-100
                ${openGroup === grupoItem ? 'ring-2 ring-amber-500/50 border-amber-600' : ''}
                overflow-hidden
                group
              `}
            >
              {/* Marco decorativo interior */}
              <div className="absolute inset-2 border border-amber-800/40 rounded pointer-events-none" />
              <div className="absolute inset-3 border border-amber-900/20 rounded pointer-events-none" />
              
              {/* Esquinas decorativas */}
              <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-amber-700/60 rounded-tl" />
              <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-amber-700/60 rounded-tr" />
              <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-amber-700/60 rounded-bl" />
              <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-amber-700/60 rounded-br" />
              
              {/* Contenido */}
              <div className="h-full flex flex-col items-center justify-center p-3">
                <span className="text-sm text-amber-200/70 tracking-widest uppercase mb-1">
                  Grupo
                </span>
                <span className="text-4xl font-bold text-amber-100 
                  drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]
                  group-hover:text-amber-50 transition-colors">
                  {grupoItem}
                </span>
              </div>
              
              {/* Brillo superior */}
              <div className="absolute top-0 left-0 right-0 h-1/3 
                bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Dropdown de personajes */}
        {openGroup === grupo && (
          <div className="mb-6 animate-[fadeIn_0.2s_ease-out]">
            <DropdownMenu characterList={characterList} grupo={grupo} handleSelection={handleSelection} />
          </div>
        )}

        {/* Botón Game Master */}
        <GameMasterButton showGameMaster={showGameMaster} />
      </div>
    </div>
  )
}

export default SelectCharacter