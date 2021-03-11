class PaginaProductos extends Crud {
    constructor() { super('Productos', contexto.repositorios.productos) }

    filtroBusqueda(filtro, obj) {
        if (Object.keys(filtro).length === 0) return true;
        if (!obj.nombre || !filtro.query) return false;
        return obj.nombre.toLowerCase().includes(filtro.query.toLowerCase());
    }

    fila(obj) {
        const ctn = $(`<div class="listado-fila-producto"></div>`);

        ctn.append(`<label class="nombre">${obj.nombre}</label>`);
        ctn.append(`<label class="precio">${obj.precio}</label>`);

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
            Texto({ titulo: 'Nombre', alCambiar: t => datos.nombre = t }),
            Numero({ titulo: 'Precio', alCambiar: t => datos.precio = t }),
            Seleccion({ titulo: 'Unidad de Medida', alCambiar: t => datos.unidad = t, opciones: [
                { titulo: 'Masa (gramos)', valor: 'masa' },
                { titulo: 'Volumen (mililitros)', valor: 'volumen' },
                { titulo: 'Unitario', valor: 'unitario' },
            ]})
        ]
    }

    formularioEdicion(datos) {
        return [
            Texto({ titulo: 'Nombre', valor: datos.nombre, alCambiar: t => datos.nombre = t }),
            Numero({ titulo: 'Precio', valor: datos.precio, alCambiar: t => datos.precio = t }),
            Seleccion({ titulo: 'Unidad de Medida', valor: datos.unidad, alCambiar: t => datos.unidad = t, opciones: [
                { titulo: 'Masa (gramos)', valor: 'masa' },
                { titulo: 'Volumen (mililitros)', valor: 'volumen' },
                { titulo: 'Unitario', valor: 'unitario' },
            ]})
        ]
    }
}