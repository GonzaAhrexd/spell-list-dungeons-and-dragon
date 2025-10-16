
import personajes from '../../jsons/CharactersList.json'
import { useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import DropdownMenu from './DropdownMenu';
type limitePotencias = {
    "1": number;
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

    const [isDropdown, setIsDropdown] = useState(false);

    const handleSelection = (char: String) => {
        localStorage.setItem('selectedCharacter', JSON.stringify(char));
        window.location.reload();
    }

  return (
    <div className="flex flex-col items-center justify-center">Selecciona tu personaje
    

    <div className='w-full max-w-[420px] mx-auto'></div>
        {Array.from(new Set(characterList.map(char => char.grupo))).map(grupo => (
            <div key={grupo} className='mb-4'>
              <div className='flex flex-row items-center justify-center'>
                <h2 className='text-xl font-bold mb-2 text-center'>Grupo  {grupo}</h2> 
                <button className='flex flex-row items-center justify-center' onClick={() => setIsDropdown(!isDropdown)}>{!isDropdown ? <ArrowDownIcon className='w-4 h-4' /> : <ArrowUpIcon className='w-4 h-4' />}</button>
              </div>
               {
                isDropdown && 
                <DropdownMenu characterList={characterList} grupo={grupo} handleSelection={handleSelection} />
               }
            </div>
        ))}

    
    </div>


  )
}

export default SelectCharacter