import personajes from '../../jsons/CharactersList.json'
import { useState, useEffect } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
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
        {Array.from(new Set(characterList.map(char => char.grupo))).map(grupo => (
            <div key={grupo} className='mb-4'>
              <div className='flex flex-row items-center justify-center'>
                <h2 className='text-xl font-bold mb-2 text-center'>Grupo  {grupo}</h2> 
                <button className='flex flex-row items-center justify-center' onClick={() => setOpenGroup(openGroup === grupo ? null : grupo)}>
                  {openGroup === grupo ? <ArrowUpIcon className='w-4 h-4' /> : <ArrowDownIcon className='w-4 h-4' />}
                </button>
              </div>
               {
                openGroup === grupo && (
                  <DropdownMenu characterList={characterList} grupo={grupo} handleSelection={handleSelection} />
                )
               }
            </div>
        ))}

    
    </div>


  )
}

export default SelectCharacter