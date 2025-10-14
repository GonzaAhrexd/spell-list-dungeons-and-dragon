// React import not required with the new JSX transform; keep file lean

import { useContext, useState } from 'react'
import { SpendContext } from '../context/spellSpend';

type Spell = {
  name?: string;
  level?: string | number;
  potencia: number | undefined;
  description?: string;
}

type SpellShowProps = {
  spell?: Spell | null;
  onClose?: () => void;
}

function SpellShow({ spell, onClose }: SpellShowProps) {

  const { spendSpell, potencia2, potencia3, potencia4, potencia5, potencia6 } = useContext(SpendContext)
  const [isUsing, setIsUsing] = useState(false)

  if (!spell) return null

  return (
    <div className="spell-modal fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="backdrop absolute inset-0 bg-black/60" onClick={() => onClose && onClose()} aria-hidden />

      <article className="modal-sheet relative w-full  max-w-[420px] bg-white rounded-2xl shadow-2xl p-4 pb-6 text-black backdrop-blur-sm">
        <header className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold">{spell.name}</h3>
            <div className="text-sm opacity-80">Nivel {spell.level} · Potencia {spell.potencia}</div>
          </div>
          <button className="ml-3 text-sm font-semibold px-3 py-1 rounded-md bg-transparent" onClick={() => onClose && onClose()} aria-label="Cerrar">
            ✕
          </button>
        </header>

        <section className="mt-3 text-sm leading-relaxed">
          <p className="description text-sm">{spell.description}</p>
        </section>

        <footer className="mt-4 flex gap-3">
          <button
            className={`flex-1 cursor-pointer use-button rounded-md py-3 font-semibold text-white flex items-center justify-center gap-2 transition-transform duration-150 ${isUsing ? 'scale-95 bg-emerald-700' : 'bg-emerald-700 hover:bg-emerald-600'}`}
            onClick={async() => {
              if (isUsing) return
              // comprobar disponibilidad según potencia
              const p = spell.potencia ?? 1
              const available = p === 1 || (p === 2 ? potencia2 > 0 : p === 3 ? potencia3 > 0 : p === 4 ? potencia4 > 0 : p === 5 ? potencia5 > 0 : p === 6 ? potencia6 > 0 : false)
              if (!available) return
              setIsUsing(true)
              try {
                await  spendSpell(spell.potencia ?? 1, spell.name ?? 'Desconocido')
              } catch (e) {
                console.error('spendSpell error', e)
              }

              setTimeout(() => {
                setIsUsing(false)
                onClose && onClose()
              }, 420)
            }}
            disabled={isUsing || !(spell.potencia === 1 || (spell.potencia === 2 ? potencia2 > 0 : spell.potencia === 3 ? potencia3 > 0 : spell.potencia === 4 ? potencia4 > 0 : spell.potencia === 5 ? potencia5 > 0 : spell.potencia === 6 ? potencia6 > 0 : false))}
          >
            {isUsing ? (
              <>
                <span className="animate-pulse">●</span>
                Usando...
              </>
            ) : (
              (spell.potencia === 1) ||
                (spell.potencia === 2 && potencia2 > 0) ||
                (spell.potencia === 3 && potencia3 > 0) ||
                (spell.potencia === 4 && potencia4 > 0) ||
                (spell.potencia === 5 && potencia5 > 0) ||
                (spell.potencia === 6 && potencia6 > 0)
                ? 'Utilizar'
                : 'Agotado'
            )}
          </button>

          <button
            className="w-28 cursor-pointer rounded-md py-3 font-medium bg-transparent border border-black/10"
            onClick={() => onClose && onClose()}
          >
            Cerrar
          </button>
        </footer>
      </article>
    </div>
  )
}

export default SpellShow