const PAGINA_COSTOS_FIJOS = new Pagina('Costos Fijos');
PAGINA_COSTOS_FIJOS.contenido(contenedor => {
    const crud = new CRUDVista(
        REPOSITORIOS.costos_fijos,
        [ 'nombre' ],
        [ 'id', 'nombre', 'tipo', 'importe' ],
        [
            { titulo: 'ID', nombre: 'id', tipo: 'numero'},
            { titulo: 'Nombre', nombre: 'nombre', tipo: 'texto'},
            { titulo: 'Tipo', nombre: 'tipo', tipo: 'opciones', opciones:
                [
                    { nombre: 'Inmobiliaria', valor: 'inm' },
                    { nombre: 'Servicios', valor: 'ser' },
                    { nombre: 'Impuestos', valor: 'imp' },
                    { nombre: 'Otros', valor: 'otr' },
                ]
            },
            { titulo: 'Importe', nombre: 'importe', tipo: 'numero'},
            { titulo: 'Periodisidad', nombre: 'periodisidad', tipo: 'opciones', opciones:
                [
                    { nombre: 'Diaria', valor: 'dia' },
                    { nombre: 'Semanal', valor: 'sem' },
                    { nombre: 'Mensual', valor: 'men' },
                ]
            },
        ]
    );
    contenedor.append(crud.render());
});