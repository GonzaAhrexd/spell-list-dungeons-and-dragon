
type SpellsMenuProps = {
    selectedLevel: string | null;
    handleSelectedLevel: (level: string) => void;
}
function SpellsMenu({selectedLevel, handleSelectedLevel}: SpellsMenuProps) {

      const levels = ['I', 'II', 'III', 'IV', 'V', 'VI']

    return (
        <section className="parchment p-4">
            <button
                key={"Trucos"}
                onClick={() => handleSelectedLevel("Trucos")}
                className={`w-full cursor-pointer mb-2 level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-medium shadow-inner
                  ${selectedLevel === "Trucos" ? 'selected' : ''}`}
                aria-pressed={selectedLevel === "Trucos"}
            >
                <span className="level-label">Trucos</span>
                <span className="level-rune" aria-hidden>✦</span>
            </button>
            <div className="levels grid grid-cols-2 gap-3">
                {levels.map((level) => (
                    <button
                        key={level}
                        onClick={() => handleSelectedLevel(level)}
                        className={`cursor-pointer level-card relative flex items-center justify-center py-4 px-3 text-center text-sm font-medium shadow-inner
                  ${selectedLevel === level ? 'selected' : ''}`}
                        aria-pressed={selectedLevel === level}
                    >
                        <span className="level-label">{level}</span>
                        <span className="level-rune" aria-hidden>✦</span>
                    </button>
                ))}
            </div>
        </section>




    )



}

export default SpellsMenu