
import { SpendContext } from "../context/spellSpend"
import { useContext } from "react"
import spellData from '../jsons/spell-list.json'
 
type SpellsMenuProps = {
    selectedLevel: string | null;
    handleSelectedLevel: (level: string) => void;
}
function SpellsMenu({selectedLevel, handleSelectedLevel}: SpellsMenuProps) {


    

    //   const levels = ['I', 'II', 'III', 'IV', 'V', 'VI', 'IX']

    const { selectedCharacter } = useContext(SpendContext);

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
    const characterSpells = data.personajes.find(p => p.personaje === selectedCharacter.personaje);
    const spells = characterSpells ? characterSpells.spells : [];
    const levelsSet = new Set<string>();
    spells.forEach(spell => {
        if (spell.nivel) {
            levelsSet.add(spell.nivel);
        }
    });

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
            'XII': 12
        };
        return romanNumerals[roman] || 0;   
        };



    const levels = Array.from(levelsSet).sort((a, b) => {
        if (romanToNumber(a) < romanToNumber(b)) return -1;
        return romanToNumber(a) - romanToNumber(b);
    });




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
                {levels.map((level) => (
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

export default SpellsMenu