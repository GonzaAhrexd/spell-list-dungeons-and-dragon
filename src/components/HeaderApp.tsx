import { useContext } from "react"
import { SpendContext } from "../context/spellSpend"
import Swal from "sweetalert2";
import numberToRoman from "../functions/NumberToRoman";

function HeaderApp() {

    const { selectedCharacter, nivelActual, levelDown, levelUp } = useContext(SpendContext);


     const levelingDown = () => {
        Swal.fire({
          title: '¿Bajar de nivel?',
          text: `¿Estás seguro de que querés bajar al nivel anterior?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sí, bajar nivel',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed && nivelActual > 1) {
            levelDown();
          } else {
            Swal.fire({
              title: 'No se puede bajar más',
              text: `Ya estás en el nivel más bajo.`,
              icon: 'info',
              confirmButtonText: 'Aceptar',
            });
          }
        });
      };
    
      const levelingUp = () => {
        Swal.fire({
          title: '¿Subir de nivel?',
          text: `¿Estás seguro de que querés subir al siguiente nivel?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sí, subir nivel',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            levelUp();
          }
        });
      };


    return (
        <>
        <header className="text-center mb-4">
            <div className='flex justify-around items-center'>
                <h1 className="title">Hechizos</h1>
            </div>
            <p className="text-lg text-[#f0d8a0] antiqua-font">{selectedCharacter?.personaje || "Sin personaje seleccionado"}</p>
                <div className="flex flex-row items-center justify-center">
              <div className="cursor-pointer text-sm font-bold text-white" onClick={() => levelingDown()}>
                -
              </div>
              <h4 className="text-md font-bold text-white px-10">Nivel {numberToRoman(nivelActual)}</h4>
              <div className="cursor-pointer text-sm font-bold text-white" onClick={() => levelingUp()}>
                +
              </div>
                </div>
            </header>
        </>
    )
}

export default HeaderApp