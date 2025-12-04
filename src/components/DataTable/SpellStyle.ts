// Estilos reutilizables - TEMA "ABISMO" (Sin blancos)
// Base: #0E090D

type StyleObject = { [key: string]: any };

// Paleta personalizada "Sin Luz Solar"
const ABYSS_THEME = {
  background: '#0E090D',     // Tu base oscura
  surface: '#181216',        // Superficies elevadas (cabeceras)
  
  // Reemplazos del blanco:
  textBone: '#bfb5aa',       // Color hueso apagado (Texto principal)
  textAsh: '#756b70',        // Color ceniza (Texto secundario)
  textGoldDim: '#8f7e4f',    // Oro muy viejo y sucio
  textGoldBright: '#c4a661', // Oro iluminado (para hover/títulos)
  
  // Bordes y detalles
  borderDark: '#2b202a',     // Bordes apenas visibles
  borderBronze: '#453526',   // Metal oxidado
  
  // Acentos
  blood: '#591212',          // Sangre seca
  magic: '#5e386e',          // Magia oscura
  hoverBg: '#1a150e'         // Fondo al pasar el mouse (ámbar muy oscuro)
};

export const spellTableStyles: StyleObject = {
  table: {
    style: {
      backgroundColor: ABYSS_THEME.background,
      color: ABYSS_THEME.textBone,
    }
  },
  header: {
    style: {
      minHeight: '64px',
      padding: '12px 24px',
      backgroundColor: ABYSS_THEME.surface,
      // Gradiente oscuro a más oscuro
      backgroundImage: `linear-gradient(180deg, ${ABYSS_THEME.surface} 0%, ${ABYSS_THEME.background} 100%)`,
      color: ABYSS_THEME.textGoldBright,
      borderBottom: `2px solid ${ABYSS_THEME.borderBronze}`,
      fontFamily: '"Cinzel", serif',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      textShadow: '0px 2px 4px rgba(0,0,0,0.9)'
    }
  },
  headRow: {
    style: {
      backgroundColor: ABYSS_THEME.background,
      borderBottom: `2px solid ${ABYSS_THEME.borderDark}`,
      minHeight: '56px',
    }
  },
  headCells: {
    style: {
      color: '#8c7666', // Marrón desaturado (Tierra)
      fontSize: '13px',
      fontFamily: '"Cinzel", serif',
      fontWeight: 800,
      paddingLeft: '16px',
      paddingRight: '16px',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    }
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: ABYSS_THEME.hoverBg,
      // NUNCA blanco, usamos color hueso brillante para el texto al hacer hover
      color: '#ded1bd', 
      borderLeft: `4px solid ${ABYSS_THEME.blood}`,
      borderBottomColor: ABYSS_THEME.borderBronze,
      transition: 'all 0.2s ease-in-out'
    },
    style: {
      fontSize: '24px',
      fontFamily: '"Crimson Text", serif',
      color: ABYSS_THEME.textBone,
      backgroundColor: ABYSS_THEME.background,
      minHeight: '60px',
      borderBottom: `1px solid ${ABYSS_THEME.borderDark}`,
    }
  },
  cells: {
    style: {
      paddingLeft: '16px',
      paddingRight: '16px'
    }
  },
  pagination: {
    style: {
      backgroundColor: ABYSS_THEME.surface,
      color: ABYSS_THEME.textAsh,
      borderTop: `1px solid ${ABYSS_THEME.borderDark}`,
    },
    pageButtonsStyle: {
        color: ABYSS_THEME.textGoldDim,
        fill: ABYSS_THEME.textGoldDim,
        '&:disabled': {
          color: '#332a2f', // Casi negro
          fill: '#332a2f',
        },
        '&:hover:not(:disabled)': {
          backgroundColor: 'rgba(196, 166, 97, 0.1)',
          fill: ABYSS_THEME.textGoldBright
        }
    }
  }
}

// Colores condicionales (Sin blancos ni brillos puros)
export const conditionalRowStyles: Array<{ when: (row: any) => boolean; style: StyleObject }> = [
  // Nivel 1: Muy oscuro (Piedra)
  {
    when: row => typeof row.potencia === 'number' && row.potencia === 1,
    style: {
      backgroundColor: ABYSS_THEME.background,
      color: ABYSS_THEME.textAsh, // Gris oscuro
    }
  },
  // Nivel 2-3: Acero sucio (En lugar de plata brillante)
  {
    when: row => typeof row.potencia === 'number' && (row.potencia === 2 || row.potencia === 3),
    style: {
      backgroundColor: ABYSS_THEME.background,
      color: '#a89f99', // Gris piedra / Acero mate
      fontWeight: 600
    }
  },
  // Nivel 4: Oro Antiguo
  {
    when: row => typeof row.potencia === 'number' && row.potencia === 4,
    style: {
      backgroundColor: 'rgba(56, 46, 26, 0.25)', // Marrón muy oscuro
      color: ABYSS_THEME.textGoldDim,
      fontWeight: 700,
      borderLeft: `2px solid ${ABYSS_THEME.textGoldDim}`
    }
  },
  // Nivel 5-6: Arcano Profundo
  {
    when: row => typeof row.potencia === 'number' && (row.potencia === 5 || row.potencia === 6),
    style: {
      backgroundColor: 'rgba(45, 20, 45, 0.25)', 
      color: '#ad7aba', // Púrpura lavanda apagado (no neón)
      fontWeight: 700,
      fontStyle: 'italic',
      borderLeft: `2px solid ${ABYSS_THEME.magic}`,
    }
  }
];

export const cellStyles = {
  nameCell: {
    style: {
      fontWeight: 800,
      fontSize: '15px',
      fontFamily: '"Cinzel", serif',
      letterSpacing: '0.5px',
      color: '#d6cdc3' // Hueso claro (lo más brillante permitido, pero no blanco)
    }
  },
  tipoBadge: (tipo: string) => {
    const isTruco = tipo === 'truco';
    return {
      style: {
        display: 'inline-block',
        padding: '4px 12px',
        // Clip path para forma de gema rota o etiqueta antigua
        clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)',
        fontSize: '11px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        
        // Colores apagados
        background: isTruco 
          ? '#242022' // Truco: Gris carbón
          : 'linear-gradient(180deg, #3d2e1e, #2b2014)', // Otros: Bronce oscuro
          
        border: `1px solid ${isTruco ? '#3d3d3d' : '#5c4632'}`,
        color: isTruco ? '#827a7a' : '#a68e65', // Texto gris piedra o bronce
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.9)' // Sombra interior fuerte
      }
    }
  }
}

export default spellTableStyles