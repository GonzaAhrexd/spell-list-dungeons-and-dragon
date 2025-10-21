import personajes from '../../jsons/CharactersList.json'
import { useState, useEffect } from 'react';
import DropdownMenu from './DropdownMenu';
import { useContext } from 'react';
import { SpendContext } from '../../context/spellSpend'


type limitePotencias = {
    "1": number | string;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
    "6": number;
}

type Personaje = {
  jugador: string;
  grupo: string;
  personaje: string;
  clase: string;
  subclase: string;
  limitePotencias: limitePotencias;
}

function SelectCharacter() {

    const characterList: Personaje[] = personajes.personajes as Personaje[];

    // Haz que se ordene por el grupo alfabeticamente ( A primero, B segundo)
    characterList.sort((a, b) => a.grupo.localeCompare(b.grupo));

    const [openGroup, setOpenGroup] = useState<string | null>(null);

    const { handleSelectCharacter, resetSpells } = useContext(SpendContext);

    const [grupo, setGrupo] = useState<string >("");
    useEffect(() => {
        if (openGroup) {
            resetSpells();
        }
    }, [openGroup]);

    const handleSelection = (char: String) => {

        handleSelectCharacter(char.toString());
        setOpenGroup(null); // Close the dropdown after selection
        window.location.reload();
    }

  return (
    <div className="flex flex-col items-center justify-center">Selecciona tu personaje
    

    <div className='w-full max-w-[420px] mx-auto'></div>
        <div className="character-selection">
          <h2 className="text-2xl font-bold text-center mb-6">Selecciona tu personaje</h2>

          <div className="grid grid-cols-3 gap-4">
            {Array.from(new Set(characterList.map(char => char.grupo))).map(grupo => (
              <> 
              <div
                key={grupo}
                className={`group p-4 border rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105`}
                onClick={() => {
                  setOpenGroup(openGroup === grupo ? null : grupo);
                  setGrupo(grupo);
                }}
              >
                <h2 className="text-lg font-semibold text-center mb-2">Grupo {grupo}</h2>
              </div>
            </>
            ))}
          </div>
            {openGroup === grupo && (
              <div className="mt-2">
                <DropdownMenu characterList={characterList} grupo={grupo} handleSelection={handleSelection} />
              </div>
            )}
        </div>
    </div>

  )
}

export default SelectCharacter