function DropdownMenu({ characterList, grupo, handleSelection }: { characterList: any[], grupo: string, handleSelection: (char: String) => void }) {
    return (
        <div className='grid grid-cols-1 gap-4 w-full'>
            {characterList.filter(char => char.grupo === grupo).map(char => (
                <div key={char.personaje} className='cursor-pointer w-full flex flex-col items-center justify-center rounded-lg border p-4' onClick={() => {
                    handleSelection(char.personaje);
                }}>
                    <h3 className='text-lg font-semibold mb-2 text-center'>{char.personaje}</h3>
                    <p className='text-sm text-center'>{char.clase} - {char.subclase}</p>
                </div>
            ))}
        </div>
    )
}

export default DropdownMenu