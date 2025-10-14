type SpellLogProps = {
    setSeeHistorial: (see: boolean) => void;
    historialHechizos: Array<{
        nombre: string;
        potencia: number;
        timestamp: number;
    }>;
    resetSpells: () => void;
}

function SpellLog({setSeeHistorial, historialHechizos, resetSpells}: SpellLogProps) {
  return (
    <section className="parchment p-4">
      <div className="bg-parchment/95 backdrop-blur-sm rounded-xl shadow-lg p-3">
        <header className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-black">Historial de hechizos usados</h4>
          <div className="flex items-center gap-2">
            <button
              className="text-xs px-2 py-1 rounded bg-red-600 hover:bg-red-300 text-white cursor-pointer"
              onClick={() => resetSpells && resetSpells()}
              aria-label="Reiniciar consumos"
            >
              Reiniciar
            </button>
          </div>
        </header>
        <nav className="flex flex-col gap-3 max-h-60 overflow-y-auto">
          {historialHechizos.length === 0 && (
            <p className="text-xs text-gray-700">No se han usado hechizos aún.</p>
          )}
          {historialHechizos.map((h, index) => (
            <div key={index} className="text-xs text-gray-800">
              {h.nombre} (Potencia {h.potencia}) - {new Date(h.timestamp).toLocaleString()}
            </div>
          ))}
        </nav>
          <button className='bg-amber-950 w-full rounded-lg mt-2 cursor-pointer' onClick={()=> setSeeHistorial(false)}>Volver</button>
      </div>
    </section>
      )
}

export default SpellLog