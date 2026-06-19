import { useEffect, useState } from "react";
import { pingServer } from "../../../../api/services/ping.routes";

type AddSpellProps = {
  setAddSpell: (value: boolean) => void;
};

function AddSpell({ setAddSpell }: AddSpellProps) {
  const [, setIsChecking] = useState(true); // Para mostrar un spinner
  const [isOnline, setIsOnline] = useState(false); // El resultado real

  useEffect(() => {
    const ping = async () => {
      setIsChecking(true);
      try {
        const response = await pingServer();
        // Si el status es 200, está online. Si no, está offline.
        setIsOnline(response?.status === 200);
      } catch (error) {
        console.error("Error pinging server:", error);
        // Si hay un error de red (catch), asumimos que no está online
        setIsOnline(false);
      } finally {
        // Terminó el chequeo, quitamos el estado de carga
        setIsChecking(false);
      }
    };

    ping();
  }, []);

  return (
    <div
      className="antiqua-font cursor-pointer w-full flex flex-col items-center justify-center rounded-lg border mt-2 "
      onClick={() => setAddSpell(true)}
    >
      Agregar Hechizo {!isOnline ? "🔴" : "🟢"}
    </div>
  );
}

export default AddSpell;
