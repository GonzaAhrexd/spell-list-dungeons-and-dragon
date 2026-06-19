import type { UseFormRegister } from "react-hook-form";

type InputTextProps = {
    nombre: string;
    valor: string;
    placeholder?: string;
    register: UseFormRegister<any>
    errors: any;
}


function InputText({ nombre, valor, placeholder, register, errors }: InputTextProps) {
    return (
        <div>
            <label className="block text-sm font-semibold text-amber-950 mb-1">{nombre}</label>
            <input
                className="mt-1 w-full rounded-lg px-3 py-2 bg-white/80 text-black placeholder-gray-500 border border-black/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                {...register(valor, { required: `El ${nombre.toLowerCase()} es obligatorio` })}
                placeholder={placeholder}
                type={nombre === "Contraseña" ? "password" : "text"}
            />
            {errors.nombre && <p className="text-xs text-red-600 mt-1">{errors.nombre.message}</p>}
        </div>

    )
}

export default InputText