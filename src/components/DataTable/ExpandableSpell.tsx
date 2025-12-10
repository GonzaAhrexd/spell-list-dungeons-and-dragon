import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

import { deleteSpell, editSpell } from '../../api/services/spells.routes'
import personajesData from '../../jsons/CharactersList.json';
type Row = {
    _id: string;
    nombre: string;
    tipo: string;
    descripcion: string;
    nivel: string;
    potencia: number;
    usuariosConHechizo: string[];
    pass: string;
}

type ExpandableSpellProps = {
    data: Row;
}

function ExpandableSpell({ data }: ExpandableSpellProps) {
    const [editMode, setEditMode] = useState(false)
    const [localData, setLocalData] = useState<Row>(data)

    const { register, handleSubmit, reset } = useForm<Row>({ defaultValues: data })

    const potencias = [1, 2, 3, 4, 5, 6];
    const niveles = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV'];

    useEffect(() => {
        setLocalData(data)
        reset(data)
    }, [data, reset])

    const onSubmit = async (values: Row) => {
        if (!values.nombre || values.nombre.trim() === '') return alert('El nombre es obligatorio')
        try {
            console.log(values)
            Swal.fire({
                title: '¿Estás seguro de guardar los cambios?',
                icon: 'question',
                showCancelButton: true,
                // Agrega para poner la contraseaña
                input: 'password',
                inputPlaceholder: 'Contraseña',
                confirmButtonText: 'Sí, guardar',
                cancelButtonText: 'Cancelar',
            }).then(async (result) => {
                if (result.isConfirmed) {

                    values.pass = result.value;
                    await editSpell(values);
                    Swal.fire('Guardado', 'Los cambios fueron guardados.', 'success');
                    window.location.reload();
                }

            })


        } catch (err) {
            console.error('Error saving spell', err)
            alert('Error al guardar. Revisa la consola.')
        }
    }

    const handleSave = () => {
        // Execute validation and submit
        handleSubmit(onSubmit)()
    }

    const handleDelete = (id: string) => {
        Swal.fire({
            title: '¿Estás seguro?',
            // Haz que ingrese la contraseña de nuevo
            input: 'password',
            inputPlaceholder: 'Contraseña',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: '#0E090C',
            color: '#f1f5f9',
            customClass: {
                confirmButton: 'antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner',
                cancelButton: 'antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner',
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                const password = result.value;
                try {
                    await deleteSpell(id, password);

                    Swal.fire({
                        title: 'Eliminado',
                        text: 'El hechizo fue eliminado.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        background: '#0E090C',
                        color: '#f1f5f9',
                        customClass: {
                            confirmButton: 'antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner',
                        }
                    }).then(() => {
                        window.location.reload();
                    });

                } catch (err) {
                    Swal.fire({
                        text: "Contraseña incorrecta o error en el servidor.",
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        background: '#0E090C',
                        color: '#f1f5f9',
                        customClass: {
                            confirmButton: 'antiqua-font w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-bold shadow-inner',
                        }
                    }
                    )
                }
            }
        })

    }

    const handleCancel = () => {
        reset(localData)
        setEditMode(false)
    }


    const personajes = personajesData.personajes || [];


    return (
        <div className="bg-[#0E090D] text-[#d6cdc3] p-4 rounded-lg shadow-lg border border-[#2b202a] flex flex-col gap-3">
            <header className="flex items-start justify-between gap-3">
                <div className="flex-1">
                    <h2 className="text-lg font-semibold leading-tight">{localData.nombre}</h2>
                    <div className="text-xs text-[#a89f99] mt-1">Nivel {localData.nivel} • Potencia {localData.potencia}</div>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: 'linear-gradient(180deg,#3d2e1e,#2b2014)', color: '#a68e65', border: '1px solid #5c4632' }}>{localData.tipo}</span>
                </div>
            </header>

            <section className="text-sm leading-relaxed text-[#cfc6bb]">
                {!editMode && (
                    <>
                        <div className="mt-1 mb-2">
                            <div className="bg-[#120a0d] p-3 rounded-md max-h-40 overflow-auto text-sm" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)' }}>{localData.descripcion}</div>
                        </div>

                        <div className="mt-2">
                            <h3 className="text-xs text-[#9a9188] mb-2">Usuarios con el hechizo</h3>
                            <ul className="flex flex-wrap gap-2">
                                {localData.usuariosConHechizo.length === 0 && <li className="text-xs text-[#7f7670]">Nadie registrado</li>}
                                {localData.usuariosConHechizo.map((usuario, index) => (
                                    <li key={index} className="text-xs px-2 py-1 rounded-full" style={{ background: '#1a150e', color: '#d6cdc3', border: '1px solid rgba(196,166,97,0.06)' }}>{usuario}</li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}

                {editMode && (
                    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="text-xs text-[#9a9188]">Nombre</label>
                            <input {...register('nombre')} className="w-full mt-1 p-2 rounded bg-[#120a0d] text-[#d6cdc3] border border-[#2b202a]" />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-xs text-[#9a9188]">Tipo</label>
                                <select {...register('tipo')} className="w-full mt-1 p-2 rounded bg-[#120a0d] text-[#d6cdc3] border border-[#2b202a]">
                                    <option value={"hechizo"}>Hechizo</option>
                                    <option value={"truco"}>Truco</option>
                                    <option value={"bendición"}>Bendición</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-xs text-[#9a9188]">Potencia</label>
                                <select {...register('potencia', { valueAsNumber: true })} className="w-full mt-1 p-2 rounded bg-[#120a0d] text-[#d6cdc3] border border-[#2b202a]">
                                    {potencias.map((potencia) => (
                                        <option key={potencia} value={potencia}>{potencia}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="text-xs text-[#9a9188]">Nivel</label>
                            <select {...register('nivel',)} className="w-full mt-1 p-2 rounded bg-[#120a0d] text-[#d6cdc3] border border-[#2b202a]">
                                {niveles.map((nivel) => (
                                    <option key={nivel} value={nivel} selected={data.nivel === nivel}>{nivel}</option>
                                ))}

                            </select>
                        </div>

                        <div>
                            <label className="text-xs text-[#9a9188]">Descripción</label>
                            <textarea {...register('descripcion')} className="w-full mt-1 p-2 rounded bg-[#120a0d] text-[#d6cdc3] border border-[#2b202a]" rows={4} />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-amber-950 mb-2">Usuarios (seleccionar uno o varios)</label>
                            <div className="grid grid-cols gap-2 max-h-56 overflow-y-auto p-3 bg-[#0f0b0c] rounded-lg border border-[#2b202a]">
                                {personajes.map((p: any) => (
                                    <>
                                    {p.subclase != "Rúnico" && 
                                    <label key={p.personaje} className="flex items-center gap-3 text-[#d6cdc3] px-3 py-2 rounded-md">
                                        <input className="w-4 h-4" type="checkbox" value={p.personaje} {...register('usuariosConHechizo')} defaultChecked={data.usuariosConHechizo.includes(p.personaje)} />
                                        <div className="text-sm">
                                            <div className="font-medium">{p.personaje}</div>
                                            <div className="text-xs text-[#9a9188]">{p.jugador}</div>
                                        </div>
                                    </label>
                                    }
                                    </>
                                ))}
                            </div>
                        </div>

                    </form>
                )}
            </section>

            <footer className="flex items-center justify-end gap-2 mt-3">
                {!editMode && (
                    <>
                        <button type="button" className="px-3 py-1 rounded-md text-sm font-medium" style={{ background: 'transparent', border: '1px solid rgba(202,163,74,0.08)', color: '#c4a661' }} aria-label={`Editar ${localData.nombre}`} onClick={() => setEditMode(true)}>Editar</button>
                        <button type="button" className="px-3 py-1 rounded-md text-sm font-medium" style={{ background: 'transparent', border: '1px solid rgba(202,163,74,0.08)', color: '#ff0000' }} aria-label={`Eliminar ${localData.nombre}`} onClick={() => handleDelete(localData._id)}>Eliminar</button>
                    </>

                )}

                {editMode && (
                    <>
                        <button type="button" className="px-3 py-1 rounded-md text-sm font-medium" style={{ background: '#2b2014', color: '#d6cdc3', border: '1px solid rgba(196,166,97,0.12)' }} onClick={handleSave}>Guardar</button>
                        <button type="button" className="px-3 py-1 rounded-md text-sm font-medium" style={{ background: 'transparent', border: '1px solid rgba(60,60,60,0.12)', color: '#9a9188' }} onClick={handleCancel}>Cancelar</button>
                    </>
                )}
            </footer>
        </div>
    )
}

export default ExpandableSpell