
import romanToNumber from "../functions/RomanToNumber";
import spellData from '../jsons/spell-list.json'
import runesData from '../jsons/runes-list.json'


type selectedCharacterType = {
    jugador: string;
    grupo: string;
    personaje: string;
    clase: string;
    subclase: string;
    runasPorNivel?: {
        [key: number]: {runasTotales: number, runasActivas: number};
    }
    limitePotencias: {
        "1": number;
        "2": number;
        "3": number;
        "4": number;
        "5": number;
        "6": number;
    };
}

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



const getLevels = (selectedCharacter: selectedCharacterType) => {

    console.log(selectedCharacter)

    const characterRunes = runicData.personajes.find(p => p.personaje === selectedCharacter.personaje);
    const characterSpells = data.personajes.find(p => p.personaje === selectedCharacter.personaje);

    const levelsSet = new Set<string>();

    // Busca con el selectedCharacter si es rúnico o no 

    const runicMode = selectedCharacter.subclase === "Rúnico";

    if(!runicMode){
        // @ts-ignore
    characterSpells.spells.forEach(spell => {
        if (spell.nivel) {
            levelsSet.add(spell.nivel);
        }
    });
} else {
        // @ts-ignore
    characterRunes.runas.forEach(rune => {
        if (rune.nivel) {
            levelsSet.add(rune.nivel);
        }
    });
}

    const levels = Array.from(levelsSet).sort((a: any, b: any) => {
        if (romanToNumber(a) < romanToNumber(b)) return -1;
        return romanToNumber(a) - romanToNumber(b);
    }
    );


    return levels;
}

export default getLevels;