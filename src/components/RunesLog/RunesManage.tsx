import { useContext, useEffect, useState, useMemo } from 'react';
import { SpendContext } from '../../context/spellSpend';
// import RunesData from '../../jsons/runes-list.json';
import { getSpellsByUser } from '../../api/services/spells.routes';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

function RunesManage() {
  const { nivelActual, setArmonicRunes, selectedCharacter } = useContext(SpendContext);
  const [selectedRunes, setSelectedRunes] = useState<Record<string, string | null>>({});
  
  // Estado para guardar la unión de JSON + Backend
  const [allRunes, setAllRunes] = useState<any[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  const { isLoading, data: backendRunes } = useQuery({
    queryKey: ['runes'],
    queryFn: async () => {
      return await getSpellsByUser(selectedCharacter.personaje);
    }
   });

  const romanValues = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];

  useEffect(() => {
    if (backendRunes && Array.isArray(backendRunes)) {
      // Filtra solo las runas armónicas del backend
      const backendArmónicas = backendRunes.filter((r: any) => r.tipoRuna === 'Armónica');
      // Si quieres mezclar con locales, aquí puedes hacerlo
      // Por ahora solo usamos las del backend
      setAllRunes(backendArmónicas);
    }
  }, [backendRunes]);

  // Agrupar runas por nivel (Memorizado para rendimiento)
  const runesByLevel = useMemo(() => {
    return Array.from({ length: nivelActual }, (_, i) => {
      const level = i + 1;
      const romanLevel = romanValues[level - 1];
      
      // Filtramos de nuestro estado unificado 'allRunes'
      const runes = allRunes.filter(rune => rune.nivel === romanLevel);

      return { level, runes };
    }).filter(({ runes }) => runes.length > 0);
  }, [allRunes, nivelActual]);

  const handleSelectRune = (level: number, runeName: string) => {
    setSelectedRunes((prev) => ({ ...prev, [level]: runeName }));
  };

  const handleConfirmSelection = () => {
    Swal.fire({
      title: 'Confirmar selección',
      text: `¿Estás seguro de que querés seleccionar estas runas armónicas?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
      background: '#0E090C',
      color: '#f1f5f9',
      customClass: {
        confirmButton: 'antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner',
        cancelButton: 'antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const totalRunes = Object.entries(selectedRunes)
          .filter(([_, name]) => name !== null)
          .map(([level, runeName]) => ({ level: Number(level), runeName }));
        // @ts-ignore
        setArmonicRunes(totalRunes);
        Swal.fire({
          title: 'Selección guardada',
          text: 'Tus runas armónicas han sido actualizadas.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      }
    }
    )
  };

  if (isLoading) return <div className="p-4 text-black">Invocando runas...</div>;

  return (
    <div className="p-4 bg-parchment rounded-xl shadow-lg">
      <h2 className="text-2xl text-black font-bold mb-4">Gestionar Runas Armónicas</h2>
      <p className="text-lg mb-2 text-black">Nivel actual del personaje: {nivelActual}</p>

      {runesByLevel.map(({ level, runes }) => (
        <div key={level} className="mb-6 border-b border-black/10 pb-4">
          <h3 className="text-xl text-black font-semibold mb-2">Círculo de Poder {level} ({romanValues[level-1]})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {runes.map((rune) => (
              <label 
                key={rune.nombre} 
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedRunes[level] === rune.nombre ? 'bg-emerald-100 border border-emerald-400' : 'hover:bg-black/5'
                }`}
              >
                <input
                  type="radio"
                  name={`rune-level-${level}`}
                  value={rune.nombre}
                  checked={selectedRunes[level] === rune.nombre}
                  onChange={() => handleSelectRune(level, rune.nombre)}
                  className="w-4 h-4 text-emerald-600"
                />
                <div className="flex flex-col">
                  <span className="text-black font-medium">{rune.nombre}</span>
                  {rune.descripcion && <span className="text-xs text-gray-600 italic">Ver detalles</span>}
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        className="w-full mt-4 px-6 py-3 bg-emerald-700 text-white font-bold rounded-lg shadow-md hover:bg-emerald-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
        onClick={handleConfirmSelection}
        disabled={Object.keys(selectedRunes).length === 0}
      >
        Guardar selección
      </button>
    </div>
  );
}

export default RunesManage;