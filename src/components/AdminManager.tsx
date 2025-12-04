import { useEffect, useState } from 'react'
import AddSpellScreen from './AddSpell/AddSpellScreen'
import { getSpells } from '../api/services/spells.routes'
import DataTable from 'react-data-table-component'
import { columnsSpell } from './DataTable/ColumnsSpell'
import spellTableStyles from './DataTable/SpellStyle'
import ExpandableSpell from './DataTable/ExpandableSpell'
import ChangeCharacter from './ChangeCharacter'

type AdminManagerProps = {
    setSeeSelectCharacter: (value: boolean) => void;
}

function AdminManager({setSeeSelectCharacter}: AdminManagerProps) {
    const [view, setView] = useState<'home' | 'add' | 'view'>('home')
    const [showingSpellList, ] = useState(false)
    const [spellData, setSpellData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchSpells = async () => {
            const response = await getSpells()
            setSpellData(response.data)
            setIsLoading(false)
        }
        fetchSpells()
    }, [])


    if(isLoading) {
        return <div className="mobile-shell w-full max-w-[420px] mx-auto p-4">
            <p>Cargando panel...</p>
        </div>
    }
    else return (
        <main className="mobile-shell w-full max-w-[420px] mx-auto">
            <header className="p-4">
                <h1 className="text-2xl font-bold flex items-center justify-center">Game Master</h1>
                <p className="text-sm text-white/70">Gestión de hechizos (agregar y revisar)</p>
            </header>

            <ChangeCharacter setSeeSelectCharacter={setSeeSelectCharacter} />

            {view === 'home' && (
                <section className="p-4 space-y-3">
                    <button
                        className={`cursor-pointer level-card relative flex items-center justify-center w-full text-center text-sm font-medium shadow-inner`}
                        onClick={() => setView('add')}
                    >
                        Agregar Hechizos
                    </button>

                    <button
                        className={`cursor-pointer level-card relative flex items-center justify-center w-full text-center text-sm font-medium shadow-inner`}
                        onClick={() => setView('view')}
                    >
                        Ver Hechizos agregados
                    </button>
                </section>
            )}

            {view === 'add' && (
                <div>
                    <div className="p-4">
                        <button className="mb-3 text-sm cursor-pointer text-gray-200" onClick={() => setView('home')}>← Volver</button>
                    </div>
                    <AddSpellScreen setAddSpell={(v: boolean) => { if (!v) setView('home') }} />
                </div>
            )}

            {view === 'view' && (
                <div>
                    {!showingSpellList && (
                        <div>
                            <div className="p-4">
                                <button className="mb-3 text-sm text-gray-200 cursor-pointer" onClick={() => setView('home')}>← Volver</button>
                            </div>
                            <DataTable  
                             columns={columnsSpell}
                             data={spellData}
                             pagination
                             expandableRows 
                             expandableRowsComponent={ExpandableSpell}
                             responsive
                             customStyles={spellTableStyles}
                             highlightOnHover
                             noDataComponent= " No hay hechizos agregados "
                                progressPending={isLoading}
                                progressComponent={<div>Cargando hechizos...</div>}

                            />

                            </div>
                    )}

                 
                </div>
            )}
        </main>
    )
}

export default AdminManager