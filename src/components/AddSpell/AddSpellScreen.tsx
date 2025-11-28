import { useForm } from "react-hook-form";
import personajesData from '../../jsons/CharactersList.json';
import Swal from 'sweetalert2';
import InputText from "../Inputs/InputText";

import { addNewSpell } from "../../api/services/spells.routes";

type FormValues = {
    nombre: string;
    descripcion?: string;
    potencia: number;
    nivelNum: number;
    nivel: string;
    tipo: string;
    usuariosConHechizo: string[];
    password: string;
}

type SetSpellProps = {
    setAddSpell: (value: boolean) => void;
}

function AddSpellScreen({ setAddSpell }: SetSpellProps) {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();

    const personajes = personajesData.personajes || [];


    const numberToRoman = (number: number): string => {
        const romanNumbers = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV']

        console.log(romanNumbers[number - 1])


        if (number < 1 || number > 15) {
            return '';
        }

        return romanNumbers[number - 1];
    };



    const onSubmit = async (data: FormValues) => {

        data.nivel = numberToRoman( data.nivelNum );
        console.log('Nuevo hechizo:', data);
        Swal.fire({
            title: 'Hechizo agregado',
            text: `Hechizo "${data.nombre}" registrado correctamente.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
        
        await addNewSpell(data);

        reset();

        
    }

    return (
        <section className="parchment p-4">
            <div className="bg-parchment/95 backdrop-blur-sm rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
                <header className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-amber-950">Agregar Hechizo</h2>
                        <p className="text-sm text-black/70">Completa los datos para registrar un nuevo hechizo.</p>
                    </div>
                </header>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 gap-4">
                        <InputText nombre="Nombre" valor="nombre" register={register} errors={errors} placeholder="Nombre del hechizo" />

                        <div>
                            <label className="block text-sm font-semibold text-amber-950 mb-1">Descripción</label>
                            <textarea
                                className="mt-1 w-full rounded-lg px-3 py-2 bg-white/80 text-black placeholder-gray-500 border border-black/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
                                {...register('descripcion')}
                                placeholder="Descripción breve"
                                rows={4}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-amber-950 mb-1">Potencia</label>
                            <select className="mt-1 w-full rounded-lg px-3 py-2 bg-white/80 border border-black/10 focus:ring-amber-500 placeholder-gray-500 text-black" {...register('potencia', { valueAsNumber: true, required: true })}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-amber-950 mb-1">Nivel</label>
                            <input
                                type="number"
                                min={1}
                                max={15}
                                className="mt-1 w-full rounded-lg px-3 py-2 bg-white/80 border border-black/10 focus:outline-none focus:ring-2 focus:ring-amber-500 text-black"
                                {...register('nivelNum', { required: true, min: 1, max: 15 })}
                            />
                        </div>

                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-amber-950 mb-1">Tipo</label>
                        <select className="mt-1 w-full rounded-lg px-3 py-2 bg-white/80 border border-black/10 text-black focus:ring-amber-500" {...register('tipo', { required: true })}>
                            <option value="Ofensivo">Hechizo</option>
                            <option value="Defensivo">Habilidad</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-amber-950 mb-2">Usuarios (seleccionar uno o varios)</label>
                        <div className="grid grid-cols gap-2 max-h-56 overflow-y-auto p-3 bg-white/5 rounded-lg border border-black/5">
                            {personajes.map((p: any) => (
                                <label key={p.personaje} className="flex items-center gap-3 text-black bg-white/10 px-3 py-2 rounded-md">
                                    <input className="w-4 h-4" type="checkbox" value={p.personaje} {...register('usuariosConHechizo')} />
                                    <div className="text-sm">
                                        <div className="font-medium">{p.personaje}</div>
                                        <div className="text-xs text-black/60">{p.jugador}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <InputText nombre="Contraseña" valor="password" register={register} errors={errors} placeholder="Contraseña" />


                    <div className="flex gap-3 justify-end">
                        <button type="button" className="px-4 py-2 rounded-lg bg-gray-200 text-black" onClick={() => setAddSpell(false)}>
                            Cancelar
                        </button>
                        <button type="submit" className="px-4 py-2 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-500">
                            Agregar Hechizo
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default AddSpellScreen