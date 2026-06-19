import { useContext } from "react";
import { SpendContext } from "@/features/main/context/spellSpend";
import Swal from "sweetalert2";
import numberToRoman from "../../../../functions/NumberToRoman";
import DadoIcon from "../../../../shared/ui/SVGs/Dado";
import { MapIcon } from "@heroicons/react/24/outline";

type HeaderAppProps = {
  setIsTiradasModal: (value: boolean) => void;
  setMapMode: (value: boolean) => void;
};

function HeaderApp({ setIsTiradasModal, setMapMode }: HeaderAppProps) {
  const { selectedCharacter, nivelActual, levelDown, levelUp } =
    useContext(SpendContext);

  const levelingDown = () => {
    Swal.fire({
      title: "¿Bajar de nivel?",
      text: `¿Estás seguro de que querés bajar al nivel anterior?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, bajar nivel",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed && nivelActual > 1) {
        levelDown();
      } else {
        Swal.fire({
          title: "No se puede bajar más",
          text: `Ya estás en el nivel más bajo.`,
          icon: "info",
          confirmButtonText: "Aceptar",
        });
      }
    });
  };

  const levelingUp = () => {
    Swal.fire({
      title: "¿Subir de nivel?",
      text: `¿Estás seguro de que querés subir al siguiente nivel?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, subir nivel",
      cancelButtonText: "Cancelar",
      background: "#0E090C",
      color: "#f1f5f9",
      customClass: {
        confirmButton:
          "antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner",
        cancelButton:
          "antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        levelUp();
      }
    });
  };

  return (
    <>
      <header className="text-center mb-4">
        <div className="flex justify-between items-center">
          <div className="flex-1"></div>
          <h1 className="title flex-1 text-center">Hechizos</h1>
          <div className="flex-1 flex gap-1 justify-end">
            <button
              className="cursor-pointer antiqua-font relative flex items-center justify-center  px-[8px] py-[8px] rounded-[10px] border border-[rgba(120,90,50,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,235,210,0.98))] text-[#2b1f0f] shadow-[inset_0_-4px_6px_rgba(0,0,0,0.06),0_6px_18px_rgba(0,0,0,0.45)] transition-[transform,box-shadow] duration-[140ms] ease-linear touch-manipulation"
              onClick={() => setIsTiradasModal(true)}
            >
              <DadoIcon className="w-6 h-6 m-auto mt-1 text-black" />
            </button>
            <button
              className="cursor-pointer antiqua-font relative flex items-center justify-center  px-[8px] py-[8px] rounded-[10px] border border-[rgba(120,90,50,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,235,210,0.98))] text-[#2b1f0f] shadow-[inset_0_-4px_6px_rgba(0,0,0,0.06),0_6px_18px_rgba(0,0,0,0.45)] transition-[transform,box-shadow] duration-[140ms] ease-linear touch-manipulation"
              onClick={() => setMapMode(true)}
            >
              <MapIcon className="w-6 h-6 m-auto mt-1 text-black" />
            </button>
          </div>
        </div>
        <p className="text-lg text-[#f0d8a0] antiqua-font">
          {selectedCharacter?.personaje || "Sin personaje seleccionado"}
        </p>
        <div className="flex flex-row items-center justify-center">
          <div
            className="cursor-pointer text-sm font-bold text-white"
            onClick={() => levelingDown()}
          >
            -
          </div>
          <h4 className="text-md font-bold text-white px-10">
            Nivel {numberToRoman(nivelActual)}
          </h4>
          <div
            className="cursor-pointer text-sm font-bold text-white"
            onClick={() => levelingUp()}
          >
            +
          </div>
        </div>
      </header>
    </>
  );
}

export default HeaderApp;
