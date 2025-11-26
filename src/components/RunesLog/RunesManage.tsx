import { useContext, useState } from 'react';
import { SpendContext } from '../../context/spellSpend';
import RunesData from '../../jsons/runes-list.json';

function RunesManage() {
  const { nivelActual, setArmonicRunes } = useContext(SpendContext);
  const [selectedRunes, setSelectedRunes] = useState<Record<string, string | null>>({});

  const romanValues = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];

  // Agrupar runas armónicas por nivel hasta el nivel actual y filtrar niveles con runas disponibles
  const runesByLevel = Array.from({ length: nivelActual }, (_, i) => {
    const level = i + 1;
    const romanLevel = romanValues[level - 1];
    const runes = RunesData.personajes.flatMap((personaje) =>
      personaje.runas.filter((rune) => rune.tipoRuna === 'Armónica' && rune.nivel === romanLevel)
    );
    return { level, runes };
  }).filter(({ runes }) => runes.length > 0); // Filtrar niveles sin runas

  const handleSelectRune = (level: number, runeName: string) => {
    setSelectedRunes((prev) => ({ ...prev, [level]: runeName }));
  };

  const handleConfirmSelection = () => {
    
    let totalRunes: any = []

    Object.entries(selectedRunes).forEach(([level, runeName]) => {
        totalRunes.push({ level, runeName }); 
    });

    setArmonicRunes(totalRunes);

  };

  return (
    <div className="p-4 bg-parchment rounded-xl shadow-lg">
      <h2 className="text-2xl text-black font-bold mb-4">Gestionar Runas Armónicas</h2>
      <p className="text-lg mb-2 text-black">Nivel actual: {nivelActual}</p>

      {runesByLevel.map(({ level, runes }) => (
        <div key={level} className="mb-4">
          <h3 className="text-xl text-black font-semibold mb-2">Nivel {level}</h3>
          <ul className="list-disc pl-5">
            {runes.map((rune) => (
              <li key={rune.nombre} className="mb-2">
                <label className="flex items-center gap-2 text-black">
                  <input
                    type="radio"
                    name={`rune-level-${level}`}
                    value={rune.nombre}
                    checked={selectedRunes[level] === rune.nombre}
                    onChange={() => handleSelectRune(level, rune.nombre)}
                  />
                  {rune.nombre}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button
        className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-500"
        onClick={handleConfirmSelection}
        disabled={Object.keys(selectedRunes).length === 0}
      >
        Confirmar selección
      </button>
    </div>
  );
}

export default RunesManage;