import { useContext } from "react"
import { SpendContext } from "../context/spellSpend"


function HeaderApp() {

    const { selectedCharacter } = useContext(SpendContext);


    return (
        <header className="text-center mb-4">
            <div className='flex justify-around items-center'>
                <h1 className="title">Hechizos</h1>
            </div>
            <p className="text-lg text-[#f0d8a0]">{selectedCharacter?.personaje || "Sin personaje seleccionado"}</p>
        </header>
    )
}

export default HeaderApp