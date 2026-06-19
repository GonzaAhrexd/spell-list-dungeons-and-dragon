// React import not required with the new JSX transform; keep file lean

import { useContext, useState, useEffect } from "react";
import { SpendContext } from "@/features/main/context/spellSpend";
import SpellAnimation from "@/features/runes/components/SpellAnimation/SpellAnimation";
import romanToNumber from "@/functions/RomanToNumber";

type Spell = {
  name: string;
  level: string;
  potencia: number | undefined;
  description?: string;
  tipo: "truco" | "hechizo" | "bendición";
};

type SpellShowProps = {
  spell?: Spell | null;
  onClose?: () => void;
};

function SpellShow({ spell, onClose }: SpellShowProps) {
  const {
    spendSpell,
    potencia2,
    potencia3,
    potencia4,
    potencia5,
    potencia6,
    nivelActual,
  } = useContext(SpendContext);
  const [isUsing, setIsUsing] = useState(false);
  const [selectedPotencia, setSelectedPotencia] = useState<number>(
    spell?.potencia ?? 1,
  );

  useEffect(() => {
    setSelectedPotencia(spell?.potencia ?? 1);
  }, [spell]);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (!spell) return null;

  const isSelectivo =
    typeof spell.potencia === "number" &&
    spell.potencia >= 1 &&
    spell.potencia < 4 &&
    spell.tipo !== "truco";

  return (
    <div className="spell-modal fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="backdrop absolute inset-0 bg-black/60"
        onClick={() => onClose && onClose()}
        aria-hidden
      />

      <article className="modal-sheet relative w-full  max-w-[420px] bg-white rounded-2xl shadow-2xl p-4 pb-6 text-black backdrop-blur-sm">
        <header className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold">{spell.name}</h3>
            <div className="text-sm opacity-80">
              {capitalizeFirstLetter(spell.tipo)}
            </div>
            <div className="text-sm opacity-80">
              Nivel {spell.level}{" "}
              {isSelectivo ? "· Selectivo" : `· Potencia ${spell.potencia}`}
            </div>
          </div>
          <button
            className="ml-3 text-sm font-semibold px-3 py-1 rounded-md bg-transparent"
            onClick={() => onClose && onClose()}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </header>

        <section className="mt-3 text-sm leading-relaxed">
          <p className="description text-lg regular-font">
            {spell.description}
          </p>
        </section>

        <footer className="mt-4 flex gap-3">
          {isUsing && <SpellAnimation onComplete={() => setIsUsing(false)} />}

          {isSelectivo ? (
            <div className="flex flex-col w-full">
              <div className="flex flex-row items-center gap-3 p-2">
                <label className="text-sm font-medium text-black">
                  Potencia
                </label>
                <select
                  className="rounded-lg px-2 py-1 border w-full"
                  value={selectedPotencia}
                  onChange={(e) => setSelectedPotencia(Number(e.target.value))}
                >
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>

              <div className="flex gap-3">
                {/** comprobar disponibilidad para la potencia seleccionada */}
                {(() => {
                  const p = selectedPotencia;
                  const disponible =
                    p === 1 ||
                    (p === 2
                      ? potencia2 > 0
                      : p === 3
                        ? potencia3 > 0
                        : p === 4
                          ? potencia4 > 0
                          : false);
                  return (
                    <div className="flex flex-row w-full">
                      <button
                        className={`flex-1 cursor-pointer use-button mx-2 rounded-md py-3 font-semibold text-white ${disponible ? "bg-amber-600 hover:bg-amber-500" : "bg-gray-400 cursor-not-allowed"}`}
                        onClick={() => {
                          if (!disponible) return;

                          setIsUsing(true);
                          try {
                            spendSpell(selectedPotencia, spell.name, true);
                          } catch (e) {}

                          setTimeout(() => {
                            setIsUsing(false);
                            onClose && onClose();
                          }, 420);
                        }}
                        disabled={!disponible}
                      >
                        {disponible ? "Usar" : "Agotado"}
                      </button>

                      <button
                        className="w-28 cursor-pointer rounded-md py-3 font-medium bg-transparent border border-black/10"
                        onClick={() => onClose && onClose()}
                      >
                        Cerrar
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          ) : (
            <>
              <button
                className={`flex-1 cursor-pointer use-button rounded-md py-3 font-semibold text-white flex items-center justify-center gap-2 transition-transform duration-150 ${isUsing ? "scale-95 bg-emerald-700" : "bg-emerald-700 hover:bg-emerald-600"}`}
                onClick={async () => {
                  if (isUsing) return;
                  // comprobar disponibilidad según potencia
                  const p = spell.potencia ?? 1;
                  const available =
                    p === 1 ||
                    (p === 2
                      ? potencia2 > 0
                      : p === 3
                        ? potencia3 > 0
                        : p === 4
                          ? potencia4 > 0
                          : p === 5
                            ? potencia5 > 0
                            : p === 6
                              ? potencia6 > 0
                              : false);
                  if (!available) return;
                  setIsUsing(true);
                  try {
                    await spendSpell(
                      spell.potencia ?? 1,
                      spell.name ?? "Desconocido",
                    );
                  } catch (e) {}

                  setTimeout(() => {
                    setIsUsing(false);
                    onClose && onClose();
                  }, 420);
                }}
                disabled={
                  isUsing ||
                  romanToNumber(spell?.level) > nivelActual ||
                  !(
                    spell.potencia === 1 ||
                    (spell.potencia === 2
                      ? potencia2 > 0
                      : spell.potencia === 3
                        ? potencia3 > 0
                        : spell.potencia === 4
                          ? potencia4 > 0
                          : spell.potencia === 5
                            ? potencia5 > 0
                            : spell.potencia === 6
                              ? potencia6 > 0
                              : false)
                  )
                }
              >
                {isUsing ? (
                  <>
                    <span className="animate-pulse">●</span>
                    Usando...
                  </>
                ) : romanToNumber(spell?.level) > nivelActual ? (
                  "Nivel insuficiente"
                ) : spell.potencia === 1 ||
                  (spell.potencia === 2 && potencia2 > 0) ||
                  (spell.potencia === 3 && potencia3 > 0) ||
                  (spell.potencia === 4 && potencia4 > 0) ||
                  (spell.potencia === 5 && potencia5 > 0) ||
                  (spell.potencia === 6 && potencia6 > 0) ? (
                  "Utilizar"
                ) : (
                  "Agotado"
                )}
              </button>

              <button
                className="w-28 cursor-pointer rounded-md py-3 font-medium bg-transparent border border-black/10"
                onClick={() => onClose && onClose()}
              >
                Cerrar
              </button>
            </>
          )}
        </footer>
      </article>
    </div>
  );
}

export default SpellShow;
