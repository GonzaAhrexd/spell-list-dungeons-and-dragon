import { useContext, useEffect } from 'react';
import { SpendContext } from '../../context/spellSpend';
import Swal from 'sweetalert2';

function RunesLog() {
  const { selectedCharacter, nivelActual, runasActivas, resetRunesSpend, levelUp, levelDown } = useContext(SpendContext);

  useEffect(() => {
    console.log(selectedCharacter?.runasPorNivel?.[nivelActual]);
  }, [selectedCharacter, nivelActual]);

  const levelingDown = () => {
    Swal.fire({
      title: '¿Bajar de nivel?',
      text: `¿Estás seguro de que querés bajar al nivel anterior?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, bajar nivel',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed && nivelActual > 1) {
        levelDown();
      } else {
        Swal.fire({
          title: 'No se puede bajar más',
          text: `Ya estás en el nivel más bajo.`,
          icon: 'info',
          confirmButtonText: 'Aceptar',
        });
      }
    });
  };

  const levelingUp = () => {
    Swal.fire({
      title: '¿Subir de nivel?',
      text: `¿Estás seguro de que querés subir al siguiente nivel?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, subir nivel',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        levelUp();
      }
    });
  };

  const runasTotales = selectedCharacter?.runasPorNivel?.[nivelActual]?.runasTotales || 0;
  const runasMaximasPorCombate = selectedCharacter?.runasPorNivel?.[nivelActual]?.runasActivas || 0;
  const porcentajeRunas = runasTotales > 0 ? Math.round((runasActivas / runasMaximasPorCombate) * 100) : 0;

  return (
    <section className="parchment p-4">
      <div className="bg-parchment/95 backdrop-blur-sm rounded-xl shadow-lg p-3">
        <header className="flex items-center justify-around mb-3">
          <div className="text-3xl font-bold text-black" onClick={() => levelingDown()}>-</div>
          <h4 className="text-3xl font-bold text-black">Nivel {nivelActual}</h4>
          <div className="text-3xl font-bold text-black" onClick={() => levelingUp()}>+</div>
        </header>

        <div className="log-entries max-h-60 overflow-y-auto">
          <ul className="list-disc list-inside text-sm text-black">
            <p className="text-xl">Runas totales: {runasTotales}</p>
            <p className="text-xl">Runas activas: {runasMaximasPorCombate}</p>
          </ul>
          <div className="flex justify-center items-center gap-3 mt-4">
            <button className='text-black' onClick={resetRunesSpend}>Reiniciar</button>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-28">
              <div className="text-xs font-semibold text-black">Usos</div>
              <div className="text-[13px] text-gray-700">{runasActivas}/{runasMaximasPorCombate}</div>
            </div>

            <div className="flex-1">
              <div className="h-3 w-full bg-black/10 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-emerald-600 transition-all duration-300`}
                  style={{ width: `${porcentajeRunas}%` }}
                  aria-hidden
                />
              </div>
            </div>
          </div>

          <button className="text-lg text-black mt-4">Gestionar runas armónicas</button>
        </div>
      </div>
    </section>
  );
}

export default RunesLog;