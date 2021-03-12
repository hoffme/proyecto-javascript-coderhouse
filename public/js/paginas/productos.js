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
        return $(`<div>
            <label class="codigo">Codigo</label>
            <label class="nombre">Nombre</label>
            <label class="precio">Precio</label>
            <label class="cantidad">Cantidad</label>
            <label class="editar"></label>
        </div>`);
    }

    fila(obj) {
        const ctn = $(`<div class="listado-fila">
            <label class="codigo">${obj.codigo}</label>
            <label class="nombre">${obj.nombre}</label>
            <label class="precio">$ ${obj.precio}</label>
            <label class="cantidad">${obj.cantidad}</label>
        </div>`);

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
            Numero({ titulo: 'Cantidad', valor: datos.cantidad, alCambiar: t => datos.cantidad = t }),
            Seleccion({ titulo: 'Unidad de Medida', valor: datos.unidad, alCambiar: t => datos.unidad = t, opciones: [
                { titulo: 'Masa (gramos)', valor: 'masa' },
                { titulo: 'Volumen (mililitros)', valor: 'volumen' },
                { titulo: 'Unitario', valor: 'unitario' },
            ]}),
        ]
    }
}