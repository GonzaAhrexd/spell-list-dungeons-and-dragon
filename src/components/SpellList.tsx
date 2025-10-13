import { useState } from 'react'
import spellData from '../spell-list.json'
import SpellShow from './SpellShow'

type JSONSpell = {
  nombre: string;
  tipo: string;
  nivel: string | null;
  descripcion?: string;
  potencia?: number;
}

type SpellListProps = {
  level: string | null;
  onBack?: () => void;
}


function SpellList({ level, onBack }: SpellListProps) {
  const [selectedSpell, setSelectedSpell] = useState<JSONSpell | null>(null)

  const openSpell = (spell: JSONSpell) => setSelectedSpell(spell)
  const closeSpell = () => setSelectedSpell(null)

  const spells: JSONSpell[] = (spellData as { spells: JSONSpell[] }).spells || []
  const matched = spells.filter((spell: JSONSpell) => {
    // level prop is 'Trucos' when user selects tricks; in JSON tricks have nivel === null
    if (level === 'Trucos') return spell.nivel === null
    return spell.nivel === level
  })

  return (
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

        <ul className="spell-grid grid grid-cols-1 gap-2 mt-4">
          {matched.map((spell: JSONSpell) => (
            <li key={spell.nombre} className="spell-item">
              <button
                className="spell-button w-full text-xs text-left px-3 py-2 rounded-lg bg-white/90 dark:bg-black/10 shadow-sm"
                onClick={() => openSpell(spell)}
                aria-label={`Abrir hechizo ${spell.nombre}`}
              >
                {spell.nombre}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal: usa el componente SpellShow y pasa la data mapeada */}
      {selectedSpell && (
        <SpellShow
          spell={{
            name: selectedSpell.nombre,
            level: selectedSpell.nivel ?? 'Truco',
            description: selectedSpell.descripcion,
            school: undefined,
            castingTime: undefined,
            range: undefined,
            components: undefined,
            duration: undefined,
          }}
          onClose={closeSpell}
        />
      )}
    </div>
  )
}

export default SpellList