// @ts-ignore
import { createContext, ReactNode, useState, useContext, useEffect } from 'react';
import personajesData from '../jsons/CharactersList.json'

type Character = {
    jugador: string;
    grupo: string;
    personaje: string;
    clase: string;
    subclase: string;
    limitePotencias: {
        "1": number;
        "2": number;
        "3": number;
        "4": number;
        "5": number;
        "6": number;
    };
}


export const SpendContext = createContext<{
    potencia1: number;
    potencia2: number;
    potencia3: number;
    potencia4: number;
    potencia5: number;
    potencia6: number;
    selectedCharacter: Character;
    historialHechizos: Array<{ nombre: string; potencia: number; timestamp: number }>;
    handleSelectCharacter: (character: string) => void;
    spendSpell: (potencia: number, nombre: string) => void;
    resetSpells: () => void;
}>({
    potencia1: 100000,
    potencia2: 4,
    potencia3: 3,
    potencia4: 3,
    potencia5: 2,
    potencia6: 1,
    selectedCharacter: {
        jugador: "",
        grupo: "",
        personaje: "",
        clase: "",
        subclase: "",
        limitePotencias: {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
        },

    },
    historialHechizos: [],
    handleSelectCharacter: () => { },
    spendSpell: () => { },
    resetSpells: () => { },
});

export const SpendProvider = ({ children }: { children: ReactNode }) => {
    // Función para cargar desde localStorage
    const loadFromLocalStorage = (key: string, defaultValue: any) => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : defaultValue;
        } catch {
            return defaultValue;
        }
    };

    const [potencia1, setPotencia1] = useState(() => loadFromLocalStorage('potencia1', 1000));
    const [potencia2, setPotencia2] = useState(() => loadFromLocalStorage('potencia2', 4));
    const [potencia3, setPotencia3] = useState(() => loadFromLocalStorage('potencia3', 3));
    const [potencia4, setPotencia4] = useState(() => loadFromLocalStorage('potencia4', 3));
    const [potencia5, setPotencia5] = useState(() => loadFromLocalStorage('potencia5', 2));
    const [potencia6, setPotencia6] = useState(() => loadFromLocalStorage('potencia6', 1));
    const [selectedCharacter, setSelectedCharacter] = useState(() => loadFromLocalStorage('selectedCharacter', "Grishnak"));

    const [historialHechizos, setHistorialHechizos] = useState<Array<{ nombre: string; potencia: number; timestamp: number }>>(
        () => loadFromLocalStorage('historialHechizos', [])
    );

    // Sincroniza con localStorage cada vez que cambian
    useEffect(() => {
        localStorage.setItem('potencia1', JSON.stringify(potencia1));
        localStorage.setItem('potencia2', JSON.stringify(potencia2));
        localStorage.setItem('potencia3', JSON.stringify(potencia3));
        localStorage.setItem('potencia4', JSON.stringify(potencia4));
        localStorage.setItem('potencia5', JSON.stringify(potencia5));
        localStorage.setItem('potencia6', JSON.stringify(potencia6));
        localStorage.setItem('historialHechizos', JSON.stringify(historialHechizos));
        localStorage.setItem('selectedCharacter', JSON.stringify(selectedCharacter));
    }, [potencia1, potencia2, potencia3, potencia4, potencia5, potencia6, historialHechizos, selectedCharacter]);

    const spendSpell = (potencia: number, nombre: string) => {
        console.log('[SpendContext] spendSpell', potencia, nombre);

        const registrarHechizo = (nivel: number) =>
            setHistorialHechizos((h) => [...h, { nombre, potencia: nivel, timestamp: Date.now() }]);

        switch (potencia) {
            case 1:
                registrarHechizo(1);
                break;
            case 2:
                setPotencia2((prev: any) => {
                    const next = Math.max(0, prev - 1);
                    registrarHechizo(2);
                    return next;
                });
                break;
            case 3:
                setPotencia3((prev: any) => {
                    const next = Math.max(0, prev - 1);
                    registrarHechizo(3);
                    return next;
                });
                break;
            case 4:
                setPotencia4((prev: any) => {
                    const next = Math.max(0, prev - 1);
                    registrarHechizo(4);
                    return next;
                });
                break;
            case 5:
                setPotencia5((prev: any) => {
                    const next = Math.max(0, prev - 1);
                    registrarHechizo(5);
                    return next;
                });
                break;
            case 6:
                setPotencia6((prev: any) => {
                    const next = Math.max(0, prev - 1);
                    registrarHechizo(6);
                    return next;
                });
                break;
            default:
                console.warn('[SpendContext] potencia desconocida', potencia);
                break;
        }
    };

    const resetSpells = () => {

        console.log("THis works")
        console.log("Selected: " + selectedCharacter.personaje)

        const { personajes } = personajesData; // data es tu JSON completo


        const characterData = personajes.find(p => p.personaje === selectedCharacter.personaje);

        console.log(characterData)

        if (characterData) {
            setPotencia1(1000); // Potencia 1 se considera ilimitada
            setPotencia2(characterData.limitePotencias ? characterData.limitePotencias["2"] : 4);
            setPotencia3(characterData.limitePotencias ? characterData.limitePotencias["3"] : 3);
            setPotencia4(characterData.limitePotencias ? characterData.limitePotencias["4"] : 2);
            setPotencia5(characterData.limitePotencias ? characterData.limitePotencias["5"] : 1);
            setPotencia6(characterData.limitePotencias ? characterData.limitePotencias["6"] : 1);
            setHistorialHechizos([]);
        }

        localStorage.removeItem('potencia1');
        localStorage.removeItem('potencia2');
        localStorage.removeItem('potencia3');
        localStorage.removeItem('potencia4');
        localStorage.removeItem('potencia5');
        localStorage.removeItem('potencia6');
        localStorage.removeItem('historialHechizos');
    };

    useEffect(() => {
        if (selectedCharacter && typeof selectedCharacter === 'object' && selectedCharacter.personaje) {
            resetSpells();
        }
    }, [selectedCharacter]);

    const handleSelectCharacter = (character: string) => {
        const selected = personajesData.personajes.find(p => p.personaje === character);
        if (selected) {
            setSelectedCharacter(selected);
        }
    }

    return (
        <SpendContext.Provider
            value={{
                potencia1,
                potencia2,
                potencia3,
                potencia4,
                potencia5,
                potencia6,
                historialHechizos,
                selectedCharacter,
                handleSelectCharacter,
                spendSpell,
                resetSpells,
            }}
        >
            {children}
        </SpendContext.Provider>
    );
};
