
import { SpendContext } from "@/features/main/context/spellSpend";
import { useContext, useEffect } from "react"
import spellData from '@/jsons/spell-list.json'
import runesData from '@/jsons/runes-list.json'
import { useState } from 'react'
import { getSpellsByUser } from "@/api/services/spells.routes"
import { useQuery } from '@tanstack/react-query'
import romanToNumber from "@/functions/RomanToNumber"

type SpellsMenuProps = {
    selectedLevel: string | null;
    handleSelectedLevel: (level: string) => void;
}

type SpellJson = {
    meta: object;
    personajes: {
        personaje: string;
        spells: Array<{
            nombre: string;
            tipo: string;
            nivel: string | null;
            descripcion: string;
            potencia: number;
        }>;
    }[];
};

type RunesJson = {
    personajes: {
        personaje: string;
        runas: Array<{
            nombre: string;
            nivel: string;
            tipoRuna: string;
            descripcion: string;
        }>;
    }[];
};


function SpellsMenu({ selectedLevel, handleSelectedLevel }: SpellsMenuProps) {

    // Contexto
    const { selectedCharacter, nivelActual } = useContext(SpendContext);
    // Modo rúnico
    const isRunicMode = selectedCharacter.subclase === "Rúnico";
    // Hooks
    const [spellsState, setSpellsState] = useState<any[]>([]);

    // Obtene los levels en base a lo que hay en spellData para el personaje seleccionado
    const data = spellData as SpellJson;
    // Obtene las runas en base a lo que hay en runesData para el personaje seleccionado
    const runicData = runesData as RunesJson

    // Filtra los datos para obtener solo los del personaje seleccionado
    const characterSpells = data.personajes.find(p => p.personaje === selectedCharacter.personaje);
    const characterRunes = runicData.personajes.find(p => p.personaje === selectedCharacter.personaje);


    
  const { isLoading, data: backendSpells } = useQuery({
    queryKey: ['spells'],
    queryFn: async () => {
      return await getSpellsByUser(selectedCharacter.personaje)
    }
  })

    // Usa useEffect para cargar los hechizos o runas del personaje seleccionado
    useEffect(() => {
        let initial;
        if (isRunicMode) {
            initial = characterRunes ? characterRunes.runas : [];
        } else {
            initial = characterSpells ? characterSpells.spells : [];
        }

        // Si hay datos del backend, mergea con los locales
        if (backendSpells && Array.isArray(backendSpells)) {
            const backendNames = new Set(backendSpells.map((s: any) => s.nombre));
            const filteredLocal = initial.filter((s: any) => !backendNames.has(s.nombre));
            setSpellsState([...backendSpells, ...filteredLocal]);
        } else {
            setSpellsState(initial);
        }
        // Solo depende de los datos del backend y el personaje seleccionado
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [backendSpells, selectedCharacter.personaje, isRunicMode]);


    useEffect(() => {

        console.log("Hechizos cargados:", spellsState); 

    }, [spellsState])


    let levelsSet: any

    if (isRunicMode) {
        levelsSet = new Set<string>();
        spellsState.forEach(rune => {
            if (rune.nivel) {
                // @ts-ignore
                levelsSet.add(rune.nivel);
            }
        }
        );
    } else {
        levelsSet = new Set<string>();
        console.log(spellsState)
        spellsState.forEach(spell => {
            if (spell.nivel) {
                levelsSet.add(spell.nivel);
            }
        });
    }

    const levels = Array.from(levelsSet).sort((a: any, b: any) => {
        if (romanToNumber(a) < romanToNumber(b)) return -1;
        return romanToNumber(a) - romanToNumber(b);
    });


    if (isLoading) {
        return <div>Cargando...</div>
    } else {

        return (
            <section className="parchment p-4">
                <button
                    key={"Trucos"}
                    onClick={() => handleSelectedLevel("Trucos")}
                    className={`w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-medium shadow-inner
                  ${selectedLevel === "Trucos" ? 'selected' : ''}`}
                    aria-pressed={selectedLevel === "Trucos"}
                >
                    <span className="level-label antiqua-font">Trucos</span>
                    <span className="level-rune" aria-hidden>✦</span>
                </button>
                <div className="levels grid grid-cols-2 gap-3">
                    {levels.map((level: any) => (
                        <button
                            key={level}
                            onClick={() => handleSelectedLevel(level)}
                            className={`cursor-pointer level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-medium shadow-inner
                  ${selectedLevel === level ? 'selected' : ''}`}
                            aria-pressed={selectedLevel === level}
                        >
                            <span className="level-label antiqua-font">{level}</span>
                            <span className="level-rune" aria-hidden>{romanToNumber(level) <= nivelActual ? "✦" : "X"}</span>
                        </button>
                    ))}
                </div>
            </section>




        )


    }

}

export default SpellsMenu