import React, { useState, useRef, useEffect } from 'react'

function MapMode({ onClose }: { onClose: () => void }) {
  // Detectar si es móvil y establecer zoom inicial
  const isMobile = window.innerWidth < 640
  const [zoom, setZoom] = useState(isMobile ? 5 : 1)
  const [position, setPosition] = useState({ x: 0, y: isMobile? 250 : 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Prevenir zoom del navegador en móvil
  useEffect(() => {
    const preventDefault = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }
    document.addEventListener('touchmove', preventDefault, { passive: false })
    return () => {
      document.removeEventListener('touchmove', preventDefault)
    }
  }, [])

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY * -0.001
    const newZoom = Math.min(Math.max(0.5, zoom + delta), 5)
    setZoom(newZoom)
  }

  // Eventos de mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Eventos táctiles
  const getTouchDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true)
      setDragStart({ 
        x: e.touches[0].clientX - position.x, 
        y: e.touches[0].clientY - position.y 
      })
    } else if (e.touches.length === 2) {
      setIsDragging(false)
      setLastTouchDistance(getTouchDistance(e.touches))
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    
    if (e.touches.length === 1 && isDragging) {
      // Desplazamiento con un dedo
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      })
    } else if (e.touches.length === 2 && lastTouchDistance) {
      // Zoom con pellizco (pinch)
      const newDistance = getTouchDistance(e.touches)
      const delta = (newDistance - lastTouchDistance) * 0.01
      const newZoom = Math.min(Math.max(0.5, zoom + delta), 5)
      setZoom(newZoom)
      setLastTouchDistance(newDistance)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setLastTouchDistance(null)
  }

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.25, 5))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.25, 0.5))
  }

  const handleResetZoom = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  const handleOpenInNewTab = () => {
    window.open('./Mapa.jpg', '_blank')
  }

  return (
    <div className="spell-modal fixed inset-0 z-50 flex items-center justify-center sm:p-4">
      <div className="backdrop absolute inset-0 bg-black/60 hidden sm:block" onClick={() => onClose && onClose()} aria-hidden />

      <article
        className="modal-sheet relative w-full h-full  parchment bg-parchment/95 sm:rounded-2xl shadow-2xl p-2 sm:p-4 pb-2 sm:pb-6 text-black backdrop-blur-sm flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label="Mapa"
      >
        <header className="flex items-center justify-between mb-2 sm:mb-0 flex-shrink-0 bg-parchment/95 z-10 py-2">
          <div>
            <h3 className="text-lg sm:text-xl font-bold">Mapa</h3>
          </div>
          <div className="flex gap-1 sm:gap-2">
            <button
              className="cursor-pointer rounded-md py-2 px-3 sm:py-2 sm:px-4 text-lg sm:text-base font-medium bg-white/80 sm:bg-transparent border border-black/10 hover:bg-black/5 active:bg-black/10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={handleZoomOut}
              title="Alejar"
            >
              -
            </button>
            <button
              className="cursor-pointer rounded-md py-2 px-2 sm:py-2 sm:px-3 text-xs sm:text-sm font-medium bg-white/80 sm:bg-transparent border border-black/10 hover:bg-black/5 active:bg-black/10 min-w-[56px] sm:min-w-[64px] min-h-[44px] flex items-center justify-center"
              onClick={handleResetZoom}
              title="Restablecer"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              className="cursor-pointer rounded-md py-2 px-3 sm:py-2 sm:px-4 text-lg sm:text-base font-medium bg-white/80 sm:bg-transparent border border-black/10 hover:bg-black/5 active:bg-black/10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={handleZoomIn}
              title="Acercar"
            >
              +
            </button>
          </div>
        </header>

        <section
          ref={containerRef}
          className="relative flex-1 overflow-hidden bg-gray-100 sm:rounded-lg border border-black/10 touch-none"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <div
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.1s',
              willChange: 'transform',
              touchAction: 'none'
            }}
          >
            <img
              src="./Mapa.jpg"
              alt="Mapa del mundo"
              draggable={false}
              style={{ 
                userSelect: 'none', 
                display: 'block', 
                margin: 'auto',
                pointerEvents: 'none'
              }}
            />
          </div>
        </section>

        <footer className="mt-2 sm:mt-0 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between flex-shrink-0 bg-parchment/95 z-10 py-2">
          <button
            className="cursor-pointer rounded-md py-3 px-4 font-medium bg-white/80 sm:bg-transparent border border-black/10 hover:bg-black/5 active:bg-black/10 min-h-[48px] text-sm sm:text-base"
            onClick={handleOpenInNewTab}
          >
            Abrir en nueva pestaña
          </button>
          <button
            className="cursor-pointer rounded-md py-3 px-4 font-medium bg-white/80 sm:bg-transparent border border-black/10 hover:bg-black/5 active:bg-black/10 min-h-[48px] text-sm sm:text-base"
            onClick={() => onClose && onClose()}
          >
            Cerrar
          </button>
        </footer>
      </article>
    </div>
  )
}

export default MapMode