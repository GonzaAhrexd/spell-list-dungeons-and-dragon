import { useEffect } from 'react';

function SpellAnimation({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onComplete();
    }, 1000); // Duración de la animación

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-32 h-32 border-8 border-green-500 rounded-full animate-ping"></div>
    </div>
  );
}

export default SpellAnimation;