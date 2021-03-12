class PaginaProductos extends Crud {
    constructor() { super('Productos', contexto.repositorios.productos) }

    filtroBusqueda(filtro, obj) {
        if (
            Object.keys(filtro).length === 0 ||
            filtro.query === ''
        ) return true;
        
        if (filtro.query) {
            if (obj.nombre && obj.nombre.toLowerCase().includes(filtro.query.toLowerCase())) return true;
            if (obj.codigo && obj.codigo.toLowerCase().includes(filtro.query.toLowerCase())) return true;
        }

        return false;
    }

    filaCabecera() {
        const ctn = $(`<div class="listado-cabecera-producto"></div>`);

        ctn.append(`<label class="codigo">Codigo</label>`);
        ctn.append(`<label class="nombre">Nombre</label>`);
        ctn.append(`<label class="precio">Precio</label>`);
        ctn.append(`<label class="cantidad">Cantidad</label>`);
        ctn.append(`<label class="editar"></label>`);

        return ctn;
    }

    fila(obj) {
        const ctn = $(`<div class="listado-fila-producto"></div>`);

        ctn.append(`<label class="codigo">${obj.codigo}</label>`);
        ctn.append(`<label class="nombre">${obj.nombre}</label>`);
        ctn.append(`<label class="precio">$ ${obj.precio}</label>`);
        ctn.append(`<label class="cantidad">${obj.cantidad}</label>`);

        const editar = $('<button>Editar</button>');
        editar.click(() => this.editar(obj));
        ctn.append(editar);

        return ctn;
    }

    cabeceraBusqueda(contenedor) {
        contenedor.append(
            Texto({
                placeholder: 'Buscar ...',
                alCambiar: texto => this.buscar({ query: texto })
            }),
            BotonPrincipal({
                titulo: 'Crear Producto',
                alClick: () => this.crear()
            })
        );
    }

    formularioCreacion(datos) { return this.formulario(datos) }

    formularioEdicion(datos) { return this.formulario(datos) }

    formulario(datos) {
        return [
            Texto({ titulo: 'Codigo', valor: datos.codigo, alCambiar: t => datos.codigo = t }),
            Texto({ titulo: 'Nombre', valor: datos.nombre, alCambiar: t => datos.nombre = t }),
            Numero({ titulo: 'Precio', valor: datos.precio, alCambiar: t => datos.precio = t }),
            Seleccion({ titulo: 'Unidad de Medida', valor: datos.unidad, alCambiar: t => datos.unidad = t, opciones: [
                { titulo: 'Masa (gramos)', valor: 'masa' },
                { titulo: 'Volumen (mililitros)', valor: 'volumen' },
                { titulo: 'Unitario', valor: 'unitario' },
            ]}),
            Numero({ titulo: 'Cantidad', valor: datos.cantidad, alCambiar: t => datos.cantidad = t })
        ]
    }
}