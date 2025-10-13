// @ts-ignore
import { createContext, ReactNode, useState, useContext, useEffect } from 'react';

export const SpendContext = createContext<{
    potencia1: number;
    potencia2: number;
    potencia3: number;
    potencia4: number;
    potencia5: number;
    potencia6: number;
    spendSpell: (potencia: number) => void;
    resetSpells: () => void;
}>({
    potencia1: 100000,
    potencia2: 4,
    potencia3: 3,
    potencia4: 3,
    potencia5: 2,
    potencia6: 1,
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
    const [resetFlag, setResetFlag] = useState(false);

    const spendSpell = (potencia: number) => {
        switch (potencia) {
            case 1:
                break;
            case 2:
                if (potencia2 > 0) setPotencia2(potencia2 - 1);
                break;
            case 3:
                if (potencia3 > 0) setPotencia3(potencia3 - 1);
                break;
            case 4:
                if (potencia4 > 0) setPotencia4(potencia4 - 1);
                break;
            case 5:
                if (potencia5 > 0) setPotencia5(potencia5 - 1);
                break;
            case 6:
                if (potencia6 > 0) setPotencia6(potencia6 - 1);
                break;
            default:
                break;
        }
    };

    const resetSpells = () => {
        setResetFlag(true);
        setPotencia1(1000);
        setPotencia2(3);
        setPotencia3(3);
        setPotencia4(3);
        setPotencia5(2);
        setPotencia6(1);
        setTimeout(() => setResetFlag(false), 1000); // Reset the flag after 1 second
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
                spendSpell,
                resetSpells,
            }}
        >
            {children}
        </SpendContext.Provider>
    );
};
