import { useForm } from "react-hook-form";
import personajesData from '../../jsons/CharactersList.json';
import Swal from 'sweetalert2';
import InputText from "../Inputs/InputText";

import { addNewSpell } from "../../api/services/spells.routes";
import numberToRoman from "../../functions/NumberToRoman";
import { useEffect, useState } from "react";

type FormValues = {
    nombre: string;
    descripcion?: string;
    potencia: number;
    nivelNum: number;
    nivel: string;
    tipo: string;
    usuariosConHechizo: string[];
    password: string;
    tipoRuna?: string;
}

type SetSpellProps = {
    setAddSpell: (value: boolean) => void;
}

function AddSpellScreen({ setAddSpell }: SetSpellProps) {

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<FormValues>();

    const personajes = personajesData.personajes || [];
    const potencia = [1, 2, 3, 4, 5, 6];
    const tipoSeleccionado = watch('tipo')

    const [isRuneMode, setIsRuneMode] = useState(false);

    useEffect(() => {
        if (tipoSeleccionado === 'runa') {
            setIsRuneMode(true);
        }
        else {
            setIsRuneMode(false);
        }
    }, [tipoSeleccionado]);


    const onSubmit = async (data: FormValues) => {

        data.nivel = numberToRoman(data.nivelNum);
        console.log('Nuevo hechizo:', data);
        Swal.fire({
            title: 'Hechizo agregado',
            text: `Hechizo "${data.nombre}" registrado correctamente.`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            background: '#0E090C',
            color: '#f1f5f9',
            customClass: {
                confirmButton: 'antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner'
            }
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

                    <div>
                        <label className="block text-sm font-semibold text-amber-950 mb-1">Tipo</label>
                        <select className="mt-1 w-full rounded-lg px-3 py-2 bg-white/80 border border-black/10 text-black focus:ring-amber-500" {...register('tipo', { required: true })}>
                            <option value="hechizo">Hechizo</option>
                            <option value="habilidad">Habilidad</option>
                            <option value="runa">Runa</option>
                        </select>
                    </div>
                    <div className={"grid gap-4" + (!isRuneMode ? " grid-cols-2" : "grid-cols-1")}>

                        {!isRuneMode &&
                            <div>
                                <label className="block text-sm font-semibold text-amber-950 mb-1">Potencia</label>
                                <select className="mt-1 w-full rounded-lg px-3 py-2 bg-white/80 border border-black/10 focus:ring-amber-500 placeholder-gray-500 text-black" {...register('potencia', { valueAsNumber: true, required: false })}>
                                    {potencia.map((p) => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>
                        }
                        {isRuneMode &&
                        <div>
                            <label className="block text-sm font-semibold text-amber-950 mb-1">Tipo de runa</label>
                            <select className="mt-1 w-full rounded-lg px-3 py-2 bg-white/80 border border-black/10 focus:ring-amber-500 placeholder-gray-500 text-black" {...register('tipoRuna', {  required: false })}>
                                <option value="Básica">Runa básica</option>
                                <option value="Armónica">Runa armónica</option>
                            </select>
                        </div>
                        }
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
                        <label className="block text-sm font-semibold text-amber-950 mb-2">Usuarios (seleccionar uno o varios)</label>
                        <div className="grid grid-cols gap-2 max-h-56 overflow-y-auto p-3 bg-white/5 rounded-lg border border-black/5">
                            {personajes.map((p: any) => (
                                <>
                                    {
                                        !isRuneMode ?
                                            p.subclase != "Rúnico" &&
                                            <label key={p.personaje} className="flex items-center gap-3 text-black bg-white/10 px-3 py-2 rounded-md">
                                                <input className="w-4 h-4" type="checkbox" value={p.personaje} {...register('usuariosConHechizo')} />
                                                <div className="text-sm">
                                                    <div className="font-medium">{p.personaje}</div>
                                                    <div className="text-xs text-black/60">{p.jugador}</div>
                                                </div>
                                            </label>
                                            :
                                            p.subclase == "Rúnico" &&
                                            <label key={p.personaje} className="flex items-center gap-3 text-black bg-white/10 px-3 py-2 rounded-md">
                                                <input className="w-4 h-4" type="checkbox" value={p.personaje} {...register('usuariosConHechizo')} />
                                                <div className="text-sm">
                                                    <div className="font-medium">{p.personaje}</div>
                                                    <div className="text-xs text-black/60">{p.jugador}</div>
                                                </div>
                                            </label>
                                    }
                                </>
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