class PaginaProductos extends Pagina {
    constructor() { super('Productos') }

    _contenido() {
        const ctn = $('<div><div>');

        ctn.append(Texto({ titulo: 'Un Texto', alCambiar: console.log }));
        ctn.append(Numero({ titulo: 'Un Numero', alCambiar: console.log }));
        ctn.append(Switch({ titulo: 'Un Switch', alCambiar: console.log }));
        ctn.append(Seleccion({ titulo: 'Un Selector', alCambiar: console.log, opciones:[
            { titulo: 'opcion 1', valor: 0 },
            { titulo: 'opcion 2', valor: 1 },
            { titulo: 'opcion 3', valor: 2 },
            { titulo: 'opcion 4', valor: 3 },
        ] }));
        ctn.append(BotonPrincipal({titulo: 'Haceme Click', alClick: () => console.log('hola')}))
        ctn.append(Boton({titulo: 'No Haceme Click', alClick: () => console.log('chau')}))

        return ctn;
    }
}