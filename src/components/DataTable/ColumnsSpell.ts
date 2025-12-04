type Row = {
    nombre: string;
    tipo: string;
    descripcion: string;
    nivel: string 
    potencia: number;
}

export const columnsSpell:Array<Object> = [ 
    {
        name: 'Nombre',
        selector: (row: Row) => row.nombre,
        sortable: true,
    },
]