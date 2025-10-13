import { useContext } from 'react'
import { SpendContext } from '../context/spellSpend'

function Consumptions() {
  const {
    potencia1,
    potencia2,
    potencia3,
    potencia4,
    potencia5,
    potencia6,
    spendSpell,
    resetSpells,
  } = useContext(SpendContext)

  const maxMap: Record<number, number> = {
    1: Infinity,
    2: 4,
    3: 3,
    4: 3,
    5: 2,
    6: 1,
  }

  const list = [
    { p: 1, count: potencia1 },
    { p: 2, count: potencia2 },
    { p: 3, count: potencia3 },
    { p: 4, count: potencia4 },
    { p: 5, count: potencia5 },
    { p: 6, count: potencia6 },
  ]

  const pct = (count: number, max: number) => {
    if (!isFinite(max)) return 100
    const v = Math.max(0, Math.min(100, Math.round((count / max) * 100)))
    return v
  }

  const displayCount = (c: number, max: number) => (max === Infinity ? '∞' : `${c}/${max}`)

  return (
    <div className="bg-parchment/95 backdrop-blur-sm rounded-xl shadow-lg p-3">
      <header className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-bold text-black">Consumibles de hechizos</h4>
        <div className="flex items-center gap-2">
          <button
            className="text-xs px-2 py-1 rounded bg-red-600 text-white"
            onClick={() => resetSpells && resetSpells()}
            aria-label="Reiniciar consumos"
          >
            Reiniciar
          </button>
        </div>
      </header>

      <nav className="flex flex-col gap-3">
        {list.map(item => {
          const max = maxMap[item.p]
          const percent = pct(item.count, max)
          return (
            <div key={item.p} className="flex items-center gap-3">
              <div className="w-28">
                <div className="text-xs font-semibold text-black">Potencia {item.p}</div>
                <div className="text-[13px] text-gray-700">{displayCount(item.count, max)}</div>
              </div>

              <div className="flex-1">
                <div className="h-3 w-full bg-black/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-emerald-600 transition-all duration-300`} 
                    style={{ width: `${percent}%` }}
                    aria-hidden
                  />
                </div>
              </div>

              {/* <div className="w-16">
                {(() => {
                  const max = maxMap[item.p]
                  const disabled = isFinite(max) && item.count <= 0
                  return (
                    <button
                      className={`w-full text-xs px-2 py-1 rounded text-white ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-500'}`}
                      onClick={() => !disabled && spendSpell && spendSpell(item.p, `Manual ${item.p}`)}
                      aria-label={`Usar hechizo potencia ${item.p}`}
                      disabled={disabled}
                    >
                      {disabled ? 'Agotado' : 'Usar'}
                    </button>
                  )
                })()}
              </div> */}
            </div>
          )
        })}
      </nav>
    </div>
  )
}

export default Consumptions