import personajes from '../../jsons/CharactersList.json'
import { useState, useEffect } from 'react';
import DropdownMenu from './DropdownMenu';
import { useContext } from 'react';
import { SpendContext } from '../../context/spellSpend'
import Swal from 'sweetalert2';
import { checkPass } from '../../api/services/pass.routes';

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
        // handleSelection('Game Master');


        checkPass(password).then(() => {
          // Swal.fire('Acceso concedido', 'Ya podés acceder', 'success');

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
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8
      bg-[radial-gradient(ellipse_at_center,_#1a0f0f_0%,_#0d0705_50%,_#050303_100%)]
      relative overflow-hidden">
      
      {/* Fondo con textura de piedra/runas */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a227' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Círculo rúnico de fondo */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-80 h-80 opacity-20 pointer-events-none">
        <div className="w-full h-full rounded-full border-2 border-amber-700/50 
          animate-[spin_60s_linear_infinite]" />
      </div>

      <div className="w-full max-w-[380px] mx-auto relative z-10">
        
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
                bg-gradient-to-b from-stone-800 via-stone-900 to-stone-950
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
        <div 
          onClick={() => showGameMaster()}
          className="
            relative cursor-pointer
            w-full py-6 px-8 rounded-sm
            bg-gradient-to-b from-amber-950/80 via-stone-900 to-stone-950
            shadow-[0_10px_30px_rgba(0,0,0,0.7)]
            transition-all duration-300 ease-out
            hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_40px_rgba(202,163,74,0.25)]
            active:scale-[0.99]
            group
            overflow-visible
          "
        >
          {/* Marco exterior dorado grueso */}
          <div className="absolute inset-0 border-4 border-amber-600/80 rounded-sm pointer-events-none
            shadow-[inset_0_0_20px_rgba(202,163,74,0.3)]" />
          
          {/* Marco interior decorativo */}
          <div className="absolute inset-2 border-2 border-amber-700/60 rounded-sm pointer-events-none" />
          <div className="absolute inset-3 border border-amber-800/40 rounded-sm pointer-events-none" />
          
          {/* Esquinas ornamentadas - Superior izquierda */}
          <div className="absolute -top-1 -left-1 w-8 h-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-transparent" />
            <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-amber-500 via-amber-400 to-transparent" />
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-amber-400 rounded-tl-sm" />
            <div className="absolute top-0 left-0 w-2 h-2 bg-amber-500 rounded-br-full shadow-[0_0_6px_rgba(202,163,74,0.8)]" />
          </div>
          
          {/* Esquinas ornamentadas - Superior derecha */}
          <div className="absolute -top-1 -right-1 w-8 h-8">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-amber-500 via-amber-400 to-transparent" />
            <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-amber-500 via-amber-400 to-transparent" />
            <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-amber-400 rounded-tr-sm" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-amber-500 rounded-bl-full shadow-[0_0_6px_rgba(202,163,74,0.8)]" />
          </div>
          
          {/* Esquinas ornamentadas - Inferior izquierda */}
          <div className="absolute -bottom-1 -left-1 w-8 h-8">
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-transparent" />
            <div className="absolute bottom-0 left-0 h-full w-1 bg-gradient-to-t from-amber-500 via-amber-400 to-transparent" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-amber-400 rounded-bl-sm" />
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-amber-500 rounded-tr-full shadow-[0_0_6px_rgba(202,163,74,0.8)]" />
          </div>
          
          {/* Esquinas ornamentadas - Inferior derecha */}
          <div className="absolute -bottom-1 -right-1 w-8 h-8">
            <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-amber-500 via-amber-400 to-transparent" />
            <div className="absolute bottom-0 right-0 h-full w-1 bg-gradient-to-t from-amber-500 via-amber-400 to-transparent" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-amber-400 rounded-br-sm" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-amber-500 rounded-tl-full shadow-[0_0_6px_rgba(202,163,74,0.8)]" />
          </div>
          
          {/* Decoraciones laterales tipo dragón/scroll */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-12 opacity-60 group-hover:opacity-80 transition-opacity">
            <div className="w-full h-full border-l-2 border-amber-500/70 rounded-l-full" />
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-500/70 rounded-tl-full" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-500/70 rounded-bl-full" />
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-12 opacity-60 group-hover:opacity-80 transition-opacity">
            <div className="w-full h-full border-r-2 border-amber-500/70 rounded-r-full" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-500/70 rounded-tr-full" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-500/70 rounded-br-full" />
          </div>
          
          {/* Corona superior */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
            <div className="relative">
              <span className="text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]
                group-hover:scale-110 transition-transform inline-block">👑</span>
              {/* Resplandor detrás de la corona */}
              <div className="absolute inset-0 -z-10 blur-md bg-amber-400/40 rounded-full scale-150" />
            </div>
          </div>
          
          {/* Línea decorativa superior */}
          <div className="absolute top-4 left-12 right-12 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          
          {/* Texto central */}
          <div className="text-center relative z-10 py-1">
            <span className="text-2xl md:text-3xl font-bold italic
              text-transparent bg-clip-text 
              bg-gradient-to-b from-amber-200 via-amber-400 to-amber-700
              drop-shadow-[0_2px_8px_rgba(202,163,74,0.5)]
              group-hover:from-amber-100 group-hover:via-amber-300 group-hover:to-amber-600
              transition-all duration-300 tracking-wider"
              style={{ textShadow: '0 0 20px rgba(202,163,74,0.4)' }}>
              Game Master
            </span>
          </div>
          
          {/* Línea decorativa inferior */}
          <div className="absolute bottom-4 left-12 right-12 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          
          {/* Brillo superior sutil */}
          <div className="absolute top-0 left-0 right-0 h-1/3 
            bg-gradient-to-b from-amber-400/10 to-transparent pointer-events-none rounded-t-sm" />
          
          {/* Resplandor interior en hover */}
          <div className="absolute inset-4 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300
            bg-gradient-to-b from-amber-500/5 via-transparent to-amber-500/5 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}

export default SelectCharacter