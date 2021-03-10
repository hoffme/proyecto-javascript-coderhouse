class PaginaProductos extends Pagina {
    constructor() { super('Productos') }

    _contenido() {
        const ctn = $('<div><div>');

        ctn.append(Texto({ titulo: 'Un Texto' }));
        ctn.append(Numero({ titulo: 'Un Numero' }));
        ctn.append(Switch({ titulo: 'Un Switch' }));
        ctn.append(Seleccion({ titulo: 'Un Selector' }));

        return ctn;
    }
}