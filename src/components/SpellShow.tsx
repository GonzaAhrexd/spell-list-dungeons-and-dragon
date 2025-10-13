// React import not required with the new JSX transform; keep file lean

type Spell = {
  name?: string;
  level?: string | number;
  school?: string;
  castingTime?: string;
  range?: string;
  components?: string;
  duration?: string;
  description?: string;
}

type SpellShowProps = {
  spell?: Spell | null;
  onClose?: () => void;
}

function SpellShow({ spell, onClose }: SpellShowProps) {
  if (!spell) return null

  return (
    <div className="spell-modal fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="backdrop absolute inset-0 bg-black/60" onClick={() => onClose && onClose()} aria-hidden />

      {/* Modal sheet (mobile bottom sheet) */}
      <article className="modal-sheet relative w-full max-w-[420px] bg-white rounded-2xl shadow-2xl p-4 pb-6 text-black backdrop-blur-sm">
        <header className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold">{spell.name}</h3>
            <div className="text-sm opacity-80">Nivel {spell.level} · {spell.school}</div>
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
            className="flex-1 use-button rounded-md py-3 font-semibold text-white bg-emerald-700 hover:bg-emerald-600"
            onClick={() => {
              // Placeholder for 'use' action - intentionally left blank for future implementation
            }}
          >
            Utilizar
          </button>

          <button
            className="w-28 rounded-md py-3 font-medium bg-transparent border border-black/10"
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