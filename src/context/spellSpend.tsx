// @ts-ignore
import { createContext, ReactNode, useState, useContext, useEffect } from 'react';



export const SpendContext = createContext<{
    potencia1: number;
    potencia2: number;
    potencia3: number;
    potencia4: number;
    potencia5: number;
    potencia6: number;
    historialHechizos: Array<{nombre: string, potencia: number, timestamp: number}>;
    spendSpell: (potencia: number, nombre: string) => void;
    resetSpells: () => void;

}>({
    potencia1: 100000,
    potencia2: 4,
    potencia3: 3,
    potencia4: 3,
    potencia5: 2,
    potencia6: 1,
    historialHechizos: [],
    spendSpell: () => {},
    resetSpells: () => {},
});

export const SpendProvider = ({ children }: { children: ReactNode }) => {
    const [potencia1, setPotencia1] = useState(1000);
    const [potencia2, setPotencia2] = useState(4);
    const [potencia3, setPotencia3] = useState(3);
    const [potencia4, setPotencia4] = useState(3);
    const [potencia5, setPotencia5] = useState(2);
    const [potencia6, setPotencia6] = useState(1);
    const [historialHechizos, setHistorialHechizos] = useState<Array<{nombre: string, potencia: number, timestamp: number}>>([]);
    // resetFlag removed: not used currently

    const spendSpell = (potencia: number, nombre: string) => {

        console.log(potencia)
        console.log('[SpendContext] spendSpell called for potencia', potencia)
        switch (potencia) {
            case 1:
                setHistorialHechizos(prev => [...prev, {nombre: nombre, potencia: 1, timestamp: Date.now()}]);
                // Potencia 1 considerada ilimitada / trucos — no decrementar
                console.log('[SpendContext] potencia 1 no se decrementa')
                // Hazle el log del historial de hechizos
                console.log(historialHechizos)
                break;
            case 2:
                setPotencia2(prev => {
                    const next = Math.max(0, prev - 1)
                    console.log('[SpendContext] potencia2:', prev, '->', next)
                    setHistorialHechizos(h => [...h, {nombre: nombre, potencia: 2, timestamp: Date.now()}]);
                    return next
                })
                break;
            case 3:
                setPotencia3(prev => {
                    const next = Math.max(0, prev - 1)
                    console.log('[SpendContext] potencia3:', prev, '->', next)
                    setHistorialHechizos(h => [...h, {nombre: nombre, potencia: 3, timestamp: Date.now()}]);
                    return next
                })
                break;
            case 4:
                setPotencia4(prev => {
                    const next = Math.max(0, prev - 1)
                    console.log('[SpendContext] potencia4:', prev, '->', next)
                    setHistorialHechizos(h => [...h, {nombre: nombre, potencia: 4, timestamp: Date.now()}]);
                    return next
                })
                break;
            case 5:
                setPotencia5(prev => {
                    const next = Math.max(0, prev - 1)
                    console.log('[SpendContext] potencia5:', prev, '->', next)
                    setHistorialHechizos(h => [...h, {nombre: nombre, potencia: 5, timestamp: Date.now()}]);
                    return next
                })
                break;
            case 6:
                setPotencia6(prev => {
                    const next = Math.max(0, prev - 1)
                    console.log('[SpendContext] potencia6:', prev, '->', next)
                    setHistorialHechizos(h => [...h, {nombre: nombre, potencia: 6, timestamp: Date.now()}]);
                    return next
                })
                break;
            default:
                console.warn('[SpendContext] potencia desconocida', potencia)
                break;
        }
    };

    const resetSpells = () => {
        setPotencia1(1000);
        setPotencia2(4);
        setPotencia3(3);
        setPotencia4(3);
        setPotencia5(2);
        setPotencia6(1);
        setHistorialHechizos([]);
        // reset complete
    };

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
                spendSpell,
                resetSpells,
            }}
        >
            {children}
        </SpendContext.Provider>
    );
};
