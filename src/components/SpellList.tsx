// REACT
import { useEffect, useState, useContext } from 'react'
// Contexto
import { SpendContext } from '../context/spellSpend';
// Componentes
import SpellShow from './SpellShow'
// Json
import spellData from '../jsons/spell-list.json'
// API
import { getSpellsByUser } from '../api/services/spells.routes'

// Iconos
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/16/solid';

type JSONSpell = {
  nombre: string;
  tipo: "truco" | "hechizo" | "bendición";
  nivel: string | null;
  descripcion: string;
  potencia: number;
};

type PersonajeSpellData = {
  personaje: string;
  spells: JSONSpell[];
};

type SpellData = {
  meta: object;
  personajes: PersonajeSpellData[];
};

type SpellListProps = {
  level: string | null;
  onBack?: () => void;
  onPreviousLevel: () => void;
  onNextLevel: () => void;
}


function SpellList({ level, onBack, onPreviousLevel, onNextLevel }: SpellListProps) {
  const [selectedSpell, setSelectedSpell] = useState<JSONSpell | null>(null)
  const [spellsState, setSpellsState] = useState<JSONSpell[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const openSpell = (spell: JSONSpell) => setSelectedSpell(spell)
  const closeSpell = () => setSelectedSpell(null)


  const { potencia2, potencia3, potencia4, potencia5, potencia6, selectedCharacter } = useContext(SpendContext)


  const handlePotencia = (p: number) => {
    switch (p) {
      case 1:
        return false; // Potencia 1 considerada ilimitada / trucos
      case 2:
        return potencia2 <= 0;
      case 3:
        return potencia3 <= 0;
      case 4:
        return potencia4 <= 0;
      case 5:
        return potencia5 <= 0;
      case 6:
        return potencia6 <= 0;
      default:
        return false;
    }
  }

  const data = spellData as SpellData;

  // const data = spellData as SpellData;

  // Esto busca el personaje actual en el JSON de hechizos
  const characterSpells = data.personajes.find(p => p.personaje === selectedCharacter.personaje);

  useEffect(() => {
    // initialize from local JSON
    const initial = characterSpells ? characterSpells.spells : []
    setSpellsState(initial)

    let mounted = true
    const fetchBackend = async () => {
      setIsLoading(true)
      try {
        const resp = await getSpellsByUser(selectedCharacter.personaje)
        const backend = Array.isArray(resp.data) ? resp.data as JSONSpell[] : []
        if (!mounted) return
        setSpellsState(prev => {
          // Set con los nombres que vienen del BACKEND
          const backendNames = new Set(backend.map(b => b.nombre));
          //  Filtramos el JSON local eliminando cualquier hechizo que el backend también nos esté mandando.
          const localSinDuplicados = prev.filter(p => !backendNames.has(p.nombre));
          // Unimos todo
          return [...localSinDuplicados, ...backend];
        });
      } catch (err) {
        console.error('Error loading backend spells', err)
      } finally {
        if (mounted) setIsLoading(false)
      }
    }
    fetchBackend()
    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCharacter.personaje])

  // Si existe, extraés sus hechizos
  const spells = spellsState;
  const matched = spells.filter((spell: JSONSpell) => {
    // level prop is 'Trucos' when user selects tricks; in JSON tricks have nivel === null
    if (level === 'Trucos') return spell.nivel === null
    return spell.nivel === level
  })


  if (isLoading) {
    return (
      <section className="parchment p-4 mt-4">
        <div className="text-black">Cargando hechizos...</div>
      </section>
    )
  }


  return (
    <section className="parchment p-4 mt-4">
      <div className="spell-list text-black">
        <div className="back-wrapper mb-3">
          <button
            className="back-button flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-md bg-transparent hover:bg-black/10"
            onClick={() => onBack && onBack()}
            aria-label="Volver a la lista de niveles"
          >
            <span aria-hidden className="back-arrow">←</span>
            <span>Para volver a la lista de niveles</span>
          </button>
          <div className='flex flex-row justify-center items-center gap-2'>
            <button className="spell-button cursor-pointer w-full text-xs text-left px-3 py-2 rounded-lg bg-white/90 dark:bg-black/10 shadow-sm flex flex-col justify-start items-start" onClick={() => onPreviousLevel()}>
              <ArrowLongLeftIcon className="h-6 w-6 text-black items-center justify-center" /> Nivel Anterior</button>
            <button className="spell-button cursor-pointer w-full text-xs text-left px-3 py-2 rounded-lg bg-white/90 dark:bg-black/10 shadow-sm flex flex-col justify-end items-end" onClick={() => onNextLevel()}>
              <ArrowLongRightIcon className="h-6 w-6 text-black items-end justify-end" /> Nivel Siguiente</button>
          </div>
        </div>

        <div className="content">
          <h2 className="text-lg font-bold">Hechizos — Nivel: {level}</h2>
          <p className="mt-2 text-sm opacity-80">Pulsa un hechizo para ver más detalles.</p>
          {/* Si la lista está vacía mostrar un mensaje */}
          {matched.length === 0 && (
            <p className="mt-2 text-sm text-gray-500">No hay hechizos disponibles para este nivel.</p>
          )}
          {/* Mostrar hechizos 'Selectivo' (potencia 1-3) primero, luego agrupar por potencia y mostrar secciones separadas */}
          {(() => {
            const isSelectivo = (s: JSONSpell) => typeof s.potencia === 'number' && s.potencia >= 1 && s.potencia < 4 && s.tipo !== 'truco'

            const selectivos = matched.filter(isSelectivo)
            const others = matched.filter(s => !isSelectivo(s))

            const groups = others.reduce((acc: Record<number, JSONSpell[]>, s) => {
              const p = typeof s.potencia === 'number' ? s.potencia : 1
              if (!acc[p]) acc[p] = []
              acc[p].push(s)
              return acc
            }, {})

            const potencias = Object.keys(groups)
              .map(k => Number(k))
              .sort((a, b) => a - b) // orden ascendente por potencia

            return (
              <div className="potencia-groups mt-4 space-y-4">
                {selectivos.length > 0 && (
                  <section className="potencia-group">
                    <h4 className="potencia-title text-sm font-semibold mb-2">Selectivo</h4>
                    <ul className="spell-grid grid grid-cols-1 gap-2">
                      {selectivos.map(spell => (
                        <li key={spell.nombre} className="spell-item">
                          <button
                            className="spell-button cursor-pointer w-full text-xs text-left px-3 py-2 rounded-lg bg-white/90 dark:bg-black/10 shadow-sm"
                            onClick={() => openSpell(spell)}
                            aria-label={`Abrir hechizo ${spell.nombre}`}
                          >
                            {spell.nombre}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {potencias.map(p => (
                  <section key={p} className="potencia-group">
                    <h4 className="potencia-title text-sm font-semibold mb-2">Potencia {p} {handlePotencia(p) && <span className="text-red-500">Agotado</span>}</h4>
                    <ul className="spell-grid grid grid-cols-1 gap-2">
                      {groups[p].map(spell => (
                        <li key={spell.nombre} className="spell-item">
                          <button
                            className="spell-button cursor-pointer w-full text-xs text-left px-3 py-2 rounded-lg bg-white/90 dark:bg-black/10 shadow-sm"
                            onClick={() => openSpell(spell)}
                            aria-label={`Abrir hechizo ${spell.nombre}`}
                          >
                            {spell.nombre}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )
          })()}
        </div>

        {selectedSpell && (
          <SpellShow
            spell={{
              name: selectedSpell.nombre,
              level: selectedSpell.nivel ?? 'Truco',
              description: selectedSpell.descripcion,
              potencia: selectedSpell.potencia,
              tipo: selectedSpell.tipo
            }}
            onClose={closeSpell}
          />
        )}
      </div>
    </section>
  )
}

export default SpellList