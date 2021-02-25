const PAGINA_HERRAMIENTAS = new Pagina('Herramientas');
PAGINA_HERRAMIENTAS.contenido(contenedor => {
    const crud = new CRUDVista(
        REPOSITORIOS.herramientas,
        [ 'nombre' ],
        [ 'id', 'nombre' ],
        [
            { titulo: 'ID', nombre: 'id', tipo: 'numero'},
            { titulo: 'Nombre', nombre: 'nombre', tipo: 'texto'},
            { titulo: 'Consumo', nombre: 'consumo', tipo: 'numero'},
            { titulo: 'Unidad de medida', nombre: 'unidad', tipo: 'opciones', opciones:
                [
                    { nombre: 'Watt/Hora', valor: 'w/h' },
                    { nombre: 'KWatt/Hora', valor: 'kw/h' },
                    { nombre: 'MWatt/Hora', valor: 'mg/h' },
                ]
            }
        ]
    );
    contenedor.append(crud.render());
});