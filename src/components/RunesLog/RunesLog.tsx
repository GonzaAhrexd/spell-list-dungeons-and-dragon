import { useContext, useEffect, useState } from 'react';
import { SpendContext } from '../../context/spellSpend';
import Swal from 'sweetalert2';
import RunesManage from './RunesManage';

function RunesLog() {
  const { nivelActual, runasActivas, selectedCharacter, resetRunesSpend, levelUp, levelDown, resetArmonicRunes, useArmonicRune, armonicRunes } = useContext(SpendContext);

  useEffect(() => {
    console.log('Nivel actual:', nivelActual);
  }, [nivelActual]);

  const handleReset = () => {
    resetRunesSpend();
    resetArmonicRunes();
  };

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

  const [seeRunasArmonicas, setSeeRunasArmonicas] = useState(false);

  const handleUseArmonicRune = (runeName: string) => {
    useArmonicRune(runeName);
    Swal.fire({
      title: 'Runa usada',
      text: `Has usado la runa armónica: ${runeName}`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  };

  return (
    <section className="parchment p-4">
      <div className="bg-parchment/95 backdrop-blur-sm rounded-xl shadow-lg p-3">
        {!seeRunasArmonicas && (
          <>
            <header className="flex items-center justify-around mb-3">
              <div className="cursor-pointer text-3xl font-bold text-black" onClick={() => levelingDown()}>
                -
              </div>
              <h4 className="text-3xl font-bold text-black">Nivel {nivelActual}</h4>
              <div className="cursor-pointer text-3xl font-bold text-black" onClick={() => levelingUp()}>
                +
              </div>
            </header>

            <div className="log-entries max-h-60 overflow-y-auto">
              <ul className="list-disc list-inside text-sm text-black">
                <p className="text-xl">Runas totales: {runasTotales}</p>
                <p className="text-xl">Runas activas: {runasActivas}</p>
              </ul>
              <div className="flex justify-center items-center gap-3 mt-4">
                <button className="text-black" onClick={() => handleReset()}>
                  Reiniciar
                </button>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-28">
                  <div className="text-xs font-semibold text-black">Usos</div>
                  <div className="text-[13px] text-gray-700">
                    {runasActivas}/{runasActivas}
                  </div>
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

              {armonicRunes.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-lg font-bold text-black mb-2">Runas Armónicas Disponibles</h4>
                  <ul className="list-disc list-inside text-sm text-black">
                    {armonicRunes.map((rune) => (
                      <li key={rune.runeName} className="flex justify-between items-center mb-2">
                        <span>{rune.runeName} {rune.disponible ? '(Disponible)' : '(No disponible)'}</span>
                        <button
                          className={`px-2 py-1 rounded text-white ${rune.disponible ? 'bg-amber-600 hover:bg-amber-500' : 'bg-gray-400 cursor-not-allowed'}`}
                          onClick={() => rune.disponible && handleUseArmonicRune(rune.runeName)}
                          disabled={!rune.disponible}
                        >
                          Usar
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                className="text-lg text-black mt-4 cursor-pointer"
                onClick={() => setSeeRunasArmonicas(true)}
              >
                Gestionar runas armónicas
              </button>
            </div>
          </>
        )}
        {seeRunasArmonicas && <RunesManage />}
      </div>
    </section>
  );
}

export default RunesLog;