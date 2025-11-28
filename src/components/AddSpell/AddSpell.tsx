import { useEffect, useState } from "react";
import { pingServer } from "../../api/services/ping.routes"

type AddSpellProps = {
    setAddSpell: (value: boolean) => void;
}
    
function AddSpell({setAddSpell}: AddSpellProps) {
  
    const [isPinging, setIsPinging] = useState(false);

    useEffect(() => {
        const ping = async () => {
            try {
                setIsPinging(true);
                const response = await pingServer();
                console.log("Ping response:", response.data);
            } catch (error) {
                console.error("Error pinging server:", error);
            } finally {
                setIsPinging(false);
            }
        };
        ping();


    }, []);

  
    return (

          <div className='antiqua-font cursor-pointer w-full flex flex-col items-center justify-center rounded-lg border mt-2 ' onClick={() => setAddSpell(true)}>Agregar Hechizo {isPinging ? "🔴" : "🟢"}</div>
    
)

}

export default AddSpell