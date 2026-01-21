import { useEffect, useState } from 'react'  
import { useContext } from 'react'
import { SpendContext } from '../context/spellSpend';

import RunesShow from './RunesShow';

// API 
import { getSpellsByUser } from '../api/services/spells.routes';

type RunesSpell = {
    nombre: string;
    nivel: string;
    tipoRuna: string;
    descripcion?: string;
}


type RunesListProps = {
    level: string | null; 
    onBack: () => void;
}

function RunesList({level, onBack}: RunesListProps) {

  const [selectedRunes, setSelectedRunes] = useState(null)
  const [runes, setRunes] = useState<RunesSpell[]>([])
  const [loading, setLoading] = useState(true)

  const openRune = (rune: any) => setSelectedRunes(rune)
  const closeRune = () => setSelectedRunes(null)

  const { selectedCharacter } = useContext(SpendContext);

  useEffect(() => {
    const fetchAndMergeRunes = async () => {
      if (!selectedCharacter?.personaje) return;
      
      try {
        setLoading(true);
        const response = await getSpellsByUser(selectedCharacter.personaje);
        // Filtrar solo las runas del backend (los que tienen tipoRuna definido)
        const backendRunes = response.data.filter((spell: any) => spell.tipoRuna && spell.tipoRuna !== '' && spell.tipoRuna !== 'Armónica');
        
        
        setRunes(backendRunes);
      } catch (error) {
        console.error('Error al cargar las runas:', error);
        // Si hay error, usa solo las runas del JSON
        // setRunes(jsonRunes);
      } finally {
        setLoading(false);
      }
    };

    fetchAndMergeRunes();
  }, [selectedCharacter]);

  const matched = runes.filter((rune: RunesSpell) => {
      // Quita las runas armónicas
  if (rune.tipoRuna === 'Armónica') return false
    if (level === 'Trucos') return rune.nivel === null || rune.nivel === ''
    return rune.nivel === level
  })


    

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
        </div>

        <div className="content">
          <h2 className="text-lg font-bold">Runas — Nivel: {level}</h2>
          <p className="mt-2 text-sm opacity-80">Pulsa un hechizo para ver más detalles.</p>
          
          {loading ? (
            <p className="mt-2 text-sm text-gray-500">Cargando runas...</p>
          ) : matched.length === 0 ? (
            <p className="mt-2 text-sm text-gray-500">No hay hechizos disponibles para este nivel.</p>
          ) : (
            (() => {
            const groups = matched.reduce((acc: Record<number, RunesSpell[]>, s) => {
              const p = typeof s.tipoRuna === 'number' ? s.tipoRuna : 1
              if (!acc[p]) acc[p] = []
              acc[p].push(s)
              return acc
            }, {})

            const potencias = Object.keys(groups)
              .map(k => Number(k))
              .sort((a, b) => a - b) // orden ascendente por potencia

            return (
              <div className="potencia-groups mt-4 space-y-4">
                {potencias.map(p => (
                  <section key={p} className="potencia-group">
                    {/* <h4 className="potencia-title text-sm font-semibold mb-2">Potencia {p} {handlePotencia(p) && <span className="text-red-500">Agotado</span>}</h4> */}
                    <ul className="spell-grid grid grid-cols-1 gap-2">
                      {groups[p].map(spell => (
                        <li key={spell.nombre} className="spell-item">
                          <button
                            className="spell-button cursor-pointer w-full text-xs text-left px-3 py-2 rounded-lg bg-white/90 dark:bg-black/10 shadow-sm"
                            onClick={() => openRune(spell)}
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
          })())
          }
        </div>
          { selectedRunes && (
            <RunesShow
              rune={selectedRunes}
              onClose={closeRune}
            />
          )}
      </div>
    </section>
  )
}

export default RunesList