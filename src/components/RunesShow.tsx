import { useContext, useEffect, useState } from "react"
import { SpendContext } from "../context/spellSpend"
import SpellAnimation from "./SpellAnimation";

type RunesShowProps = {
  rune?: any | null;
  onClose?: () => void;
}

function RunesShow({ rune, onClose }: RunesShowProps) {

  const { runasActivas, spendRune } = useContext(SpendContext)
  const [isUsing, setIsUsing] = useState(false)

  useEffect(() => {
    console.log(rune)

  }, [rune])

  if (!rune) return null

  return (
    <div className="spell-modal fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="backdrop absolute inset-0 bg-black/60" onClick={() => onClose && onClose()} aria-hidden />

      <article className="modal-sheet relative w-full  max-w-[420px] bg-white rounded-2xl shadow-2xl p-4 pb-6 text-black backdrop-blur-sm">
        <header className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold">{rune?.nombre}</h3>
            <div className="text-sm opacity-80">Nivel {rune?.nivel} · {rune?.tipoRuna}</div>
          </div>
          <button className="ml-3 text-sm font-semibold px-3 py-1 rounded-md bg-transparent" onClick={() => onClose && onClose()} aria-label="Cerrar">
            ✕
          </button>
        </header>

        <section className="mt-3 text-sm leading-relaxed">
          {/* <p className="description text-lg regular-font">{spell.description}</p> */}
        </section>

        <footer className="mt-4 flex gap-3">
          {isUsing && <SpellAnimation onComplete={() => setIsUsing(false)} />}
          <button
            className={`flex-1 cursor-pointer use-button rounded-md py-3 font-semibold text-white flex items-center justify-center gap-2 transition-transform duration-150 ${isUsing ? 'scale-95 bg-emerald-700' : 'bg-emerald-700 hover:bg-emerald-600'}`}
            onClick={async () => {

              if (isUsing) return
              // comprobar disponibilidad según potencia

              const available = runasActivas > 0
              if (!available) return
              setIsUsing(true)
              try {
                await spendRune()
              } catch (e) {
              }

              setTimeout(() => {
                setIsUsing(false)
                onClose && onClose()
              }, 420)
            }}
            disabled={isUsing || runasActivas <= 0}
          >
            {isUsing ? (
              <>
                <span className="animate-pulse">●</span>
                Usando...
              </>
            ) : (
              (runasActivas > 0)
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

export default RunesShow