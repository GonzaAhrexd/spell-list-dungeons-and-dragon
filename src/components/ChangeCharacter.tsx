import { useContext } from "react";
import { SpendContext } from "../context/spellSpend";
function ChangeCharacter() {
    const { handleSelectCharacter } = useContext(SpendContext);

    const handleChange = (character: string) => {
        handleSelectCharacter(character);
    }



    return (
          <div className='cursor-pointer w-full bg-amber-300' onClick={() => handleChange("Grishnak")}>Seleccionar Grishnak</div>
  )
}

export default ChangeCharacter