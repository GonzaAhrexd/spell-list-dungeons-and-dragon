import { useState } from 'react'
import SpellShow from './SpellShow'
import { useContext } from 'react'
import { SpendContext } from '../context/spellSpend';

import spellData from '../jsons/spell-list.json'

type JSONSpell = {
  nombre: string;
  tipo: string;
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
}


function SpellList({ level, onBack }: SpellListProps) {
  const [selectedSpell, setSelectedSpell] = useState<JSONSpell | null>(null)

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

  // Esto busca el personaje actual en el JSON de hechizos
  const characterSpells = data.personajes.find(p => p.personaje === selectedCharacter.personaje);

  
  // Si existe, extraés sus hechizos
  const spells = characterSpells ? characterSpells.spells : []; const matched = spells.filter((spell: JSONSpell) => {
    // level prop is 'Trucos' when user selects tricks; in JSON tricks have nivel === null
    if (level === 'Trucos') return spell.nivel === null
    return spell.nivel === level
  })
  
  console.log(spells)

  
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
          <h2 className="text-lg font-bold">Hechizos — Nivel: {level}</h2>
          <p className="mt-2 text-sm opacity-80">Pulsa un hechizo para ver más detalles.</p>
          {/* Si la lista está vacía mostrar un mensaje */}
          {matched.length === 0 && (
            <p className="mt-2 text-sm text-gray-500">No hay hechizos disponibles para este nivel.</p>
          )}
          {/* Agrupar por potencia y mostrar secciones separadas */}
          {(() => {
            const groups = matched.reduce((acc: Record<number, JSONSpell[]>, s) => {
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
            }}
            onClose={closeSpell}
          />
        )}
      </div>
    </section>
  )
}

export default SpellList