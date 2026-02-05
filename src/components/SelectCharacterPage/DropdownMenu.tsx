function DropdownMenu({ characterList, grupo, handleSelection }: { characterList: any[], grupo: string, handleSelection: (char: String) => void }) {
    return (
        <div className='grid grid-cols-1 gap-3 w-full'>
            {characterList.filter(char => char.grupo === grupo).map(char => (
                <div 
                    key={char.personaje} 
                    onClick={() => handleSelection(char.personaje)}
                    className='
                        relative cursor-pointer w-full 
                        flex flex-col items-center justify-center 
                        rounded-lg py-4 px-5
                        bg-gradient-to-b from-stone-800/90 via-stone-900 to-stone-950
                        border border-amber-900/50
                        shadow-[0_4px_16px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.03)]
                        transition-all duration-200 ease-out
                        hover:scale-[1.02] hover:border-amber-700/70
                        hover:shadow-[0_6px_20px_rgba(0,0,0,0.6),0_0_15px_rgba(202,163,74,0.1)]
                        active:scale-[0.99]
                        group
                    '
                >
                    {/* Marco decorativo interior */}
                    <div className="absolute inset-1 border border-amber-800/20 rounded pointer-events-none" />
                    
                    <h3 className='text-lg font-semibold text-amber-100 
                        group-hover:text-amber-50 transition-colors
                        drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'>
                        {char.personaje}
                    </h3>
                    <p className='text-sm text-amber-200/60 mt-1
                        group-hover:text-amber-200/80 transition-colors'>
                        {char.clase} - {char.subclase}
                    </p>
                    
                    {/* Brillo superior */}
                    <div className="absolute top-0 left-0 right-0 h-1/2 
                        bg-gradient-to-b from-white/3 to-transparent pointer-events-none rounded-t-lg" />
                </div>
            ))}
        </div>
    )
}

export default DropdownMenu