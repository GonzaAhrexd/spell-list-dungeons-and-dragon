import TiradasList from '../../jsons/TiradasList.json';

type TiradasModalProps = {
  onClose?: () => void;
}


//   background: '#0E090C',
//   color: '#f1f5f9',
      

function TiradasModal({ onClose }: TiradasModalProps) {



  return (
    <div className="spell-modal fixed inset-0 z-50 flex items-center justify-center px-4 ">
      <div className="backdrop absolute inset-0 bg-black/60" onClick={() => onClose && onClose()} aria-hidden />

      <article
        className="modal-sheet relative w-full max-w-[420px] parchment bg-parchment/95 rounded-2xl shadow-2xl p-4 pb-6 text-black backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Tiradas"
      >
        <header className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold">Guía de tiradas</h3>
          </div>

        </header>

        <section className="mt-3 text-sm leading-relaxed space-y-3">
          <p className="regular-font text-base text-gray-800">
            Esta es una guía rápida sobre qué tiradas corresponden con cada atributo en el juego
          </p>
        </section>

        <section className="mt-4 max-h-80 overflow-y-auto">
            <ul className="space-y-3">
                {TiradasList.map((tirada, index) => ( 
                    <li key={index} className="p-3 border border-gray-300 rounded-lg cursor-pointer level-card relative flex flex-col items-center justify-center py-4 px-3 text-center text-sm font-medium shadow-inner">
                        <h4 className="font-bold mb-1">{tirada.nombre}</h4>
                        <p>{tirada.atributo}</p>
                    </li>
                ))}

        </ul>
        </section>


        <footer className="mt-4 flex justify-end">
          <button
            className="cursor-pointer rounded-md py-3 px-4 font-medium bg-transparent border border-black/10"
            onClick={() => onClose && onClose()}
          >
            Cerrar
          </button>
        </footer>
      </article>
    </div>
  )
}

export default TiradasModal