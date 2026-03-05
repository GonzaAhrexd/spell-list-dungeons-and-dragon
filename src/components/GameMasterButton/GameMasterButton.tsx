type GameMasterButtonProps = {
    showGameMaster: () => void;
}

function GameMasterButton({ showGameMaster }: GameMasterButtonProps) {
  return (
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
          )
}

export default GameMasterButton