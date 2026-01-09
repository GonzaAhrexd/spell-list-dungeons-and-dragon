
import { SpendContext } from "../context/spellSpend"
import { useContext, useEffect } from "react"
import spellData from '../jsons/spell-list.json'
import runesData from '../jsons/runes-list.json'
import { useState } from 'react'
import { getSpellsByUser } from "../api/services/spells.routes"

import romanToNumber from "../functions/RomanToNumber"

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
    const [isLoading, setIsLoading] = useState(true);
    const [spellsState, setSpellsState] = useState<any[]>([]);

    // Obtene los levels en base a lo que hay en spellData para el personaje seleccionado
    const data = spellData as SpellJson;
    // Obtene las runas en base a lo que hay en runesData para el personaje seleccionado
    const runicData = runesData as RunesJson

    // Filtra los datos para obtener solo los del personaje seleccionado
    const characterSpells = data.personajes.find(p => p.personaje === selectedCharacter.personaje);
    const characterRunes = runicData.personajes.find(p => p.personaje === selectedCharacter.personaje);

    // Use effect para cargar los hechizos o runas del personaje seleccionado
    useEffect(() => {
        // Initialize spells from local JSON for the selected character
        let initial
        if (isRunicMode) {
            initial = characterRunes ? characterRunes.runas : [];
        } else {
            initial = characterSpells ? characterSpells.spells : [];
        }

        // setSpellsState(initial); 
        // Fetch backend spells for the user and append to local spells
        let mounted = true;
        const getSpellsUser = async () => {
            setIsLoading(true);
            try {

                // console.log(characterSpells)

                const response = await getSpellsByUser(selectedCharacter.personaje);


                if (!mounted) return;
                const backendSpells = Array.isArray(response.data) ? response.data : [];
                // Merge backend spells with existing local spellsState safely
                setSpellsState(() => {
                    // 1. Obtenemos los nombres de los hechizos que vienen del backend
                    const backendNames = new Set(backendSpells.map((s: any) => s.nombre));

                    // 2. Filtramos la variable 'initial' (los del JSON) para ELIMINAR 
                    // a los que se llamen igual que los del backend
                    const filteredLocal = initial.filter(s => !backendNames.has(s.nombre));

                    // 3. Unimos los locales limpios con los del backend
                    // Al poner los del backend al final, nos aseguramos de que sean los que se vean
                    return [...backendSpells, ...filteredLocal];
                });

            } catch (error) {
                console.error("Error fetching spells:", error);
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        getSpellsUser();


        return () => {
            mounted = false;
        };
    }, [selectedCharacter.personaje]);

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
                            <span className="level-rune" aria-hidden>{romanToNumber(level) <= nivelActual ? "✦" : "🛇"}</span>
                        </button>
                    ))}
                </div>
            </section>




        )


    }

}

export default SpellsMenu