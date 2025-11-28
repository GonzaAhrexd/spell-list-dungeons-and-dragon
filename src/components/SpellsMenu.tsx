
import { SpendContext } from "../context/spellSpend"
import { useContext, useEffect } from "react"
import spellData from '../jsons/spell-list.json'
import runesData from '../jsons/runes-list.json'
 import { useState } from 'react'
import { getSpellsByUser } from "../api/services/spells.routes"
type SpellsMenuProps = {
    selectedLevel: string | null;
    handleSelectedLevel: (level: string) => void;
}
function SpellsMenu({selectedLevel, handleSelectedLevel}: SpellsMenuProps) {


    


    const { selectedCharacter } = useContext(SpendContext);
    const isRunicMode = selectedCharacter.subclase === "Rúnico";
    const [isLoading, setIsLoading] = useState(true);
    const [spellsState, setSpellsState] = useState<any[]>([]);

    // Obtene los levels en base a lo que hay en spellData para el personaje seleccionado
    const data = spellData as {
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

    const runicData = runesData as {
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

    const characterRunes = runicData.personajes.find(p => p.personaje === selectedCharacter.personaje);


    const characterSpells = data.personajes.find(p => p.personaje === selectedCharacter.personaje);

    useEffect(() => {
        // Initialize spells from local JSON for the selected character
        const initial = characterSpells ? characterSpells.spells : [];
        setSpellsState(initial);

        // Fetch backend spells for the user and append to local spells
        let mounted = true;
        const getSpellsUser = async () => {
            setIsLoading(true);
            try {
                const response = await getSpellsByUser(selectedCharacter.personaje);
                if (!mounted) return;
                const backendSpells = Array.isArray(response.data) ? response.data : [];
                // Merge backend spells with existing local spellsState safely
                setSpellsState(prev => {
                    // avoid duplicates by simple name check (adjust as needed)
                    const names = new Set(prev.map(s => s.nombre));
                    const newOnes = backendSpells.filter((s: any) => !names.has(s.nombre));
                    return [...prev, ...newOnes];
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
    // Re-run when selectedCharacter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCharacter.personaje]);
    

    
    let levelsSet: any
    

    if(isRunicMode) {
        levelsSet = new Set<string>();
        characterRunes?.runas.forEach(rune => {
            if (rune.nivel) {
                // @ts-ignore
                levelsSet.add(rune.nivel);
            }
        }
        );
    }
    else{
        levelsSet = new Set<string>();
        spellsState.forEach(spell => {
            if (spell.nivel) {
                levelsSet.add(spell.nivel);
            }
        });
}   

    const romanToNumber = (roman: string): number => {
        const romanNumerals: { [key: string]: number } = {
            'I': 1,
            'II': 2,
            'III': 3,
            'IV': 4,
            'V': 5,
            'VI': 6,
            'VII': 7,
            'VIII': 8,
            'IX': 9,
            'X': 10,
            'XI': 11,
            'XII': 12,
            'XIII': 13,
            'XIV': 14,
            'XV': 15
        };
        return romanNumerals[roman] || 0;   
        };



    const levels = Array.from(levelsSet).sort((a: any, b: any) => {
        if (romanToNumber(a) < romanToNumber(b)) return -1;
        return romanToNumber(a) - romanToNumber(b);
    });


    if(isLoading){
        return <div>Cargando...</div>
    }else { 
        
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
                <span className="level-rune " aria-hidden>✦</span>
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
                        <span className="level-rune" aria-hidden>✦</span>
                    </button>
                ))}
            </div>
        </section>




    )


    }

}

export default SpellsMenu