class PaginaProductos extends Crud {
    constructor(repositorio) { super('Productos', repositorio) }

    filtroBusqueda(filtro, obj) {
        return obj.nombre.toLowerCase().includes(filtro.query.toLowerCase());
    }

    fila(obj) {
        const ctn = $(`<div class="listado-fila-producto"></div>`);

        ctn.append(`<label class="nombre">${obj.nombre}</label>`);

        const editar = $('<button>Editar</button>');
        editar.click(() => this.editar(obj));
        ctn.append(editar);

        return ctn;
    }

    cabeceraBusqueda(contenedor) {
        contenedor.append(
            Texto({
                placeholder: 'Buscar por nombre',
                alCambiar: texto => this.buscar({ query: texto })
            }),
            BotonPrincipal({
                titulo: 'Crear Producto',
                alClick: () => this.crear()
            })
        );
    }

    formularioCreacion(datos) {
        return [
            Texto({ titulo: 'Nombre', alCambiar: t => datos.nombre = t })
        ]
    }

    formularioEdicion(datos) {
        return [
            Texto({ titulo: 'Nombre', alCambiar: t => datos.nombre = t })
        ]
    }
}