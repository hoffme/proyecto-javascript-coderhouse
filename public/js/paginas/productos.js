const PAGINA_PRODUCTOS = new Pagina('Productos');
PAGINA_PRODUCTOS.contenido(contenedor => {
    const crud = new CRUDVista(
        REPOSITORIOS.productos,
        [ 'nombre'],
        [ 'id', 'nombre', 'precio' ],
        [
            { titulo: 'ID', nombre: 'id', tipo: 'numero'},
            { titulo: 'Nombre', nombre: 'nombre', tipo: 'texto'},
            { titulo: 'Codigo', nombre: 'codigo', tipo: 'texto'},
            { titulo: 'Precio', nombre: 'precio', tipo: 'numero'},
            { titulo: 'Unidad de medida', nombre: 'unidad', tipo: 'opciones', opciones:
                [
                    { nombre: 'Unidad', valor: 'uni' },
                    { nombre: 'Volumen', valor: 'vol' },
                    { nombre: 'Masa', valor: 'masa' },
                ]
            }
        ]
    );
    contenedor.append(crud.render());
});