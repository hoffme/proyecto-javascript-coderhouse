class PaginaMateriaPrima extends Crud {
    constructor(repoMateriaPrima) { super('Materia Prima', repoMateriaPrima) }

    filtrador() {
        const cabecera = $('<div><div>');

        cabecera.append(
            Input.Texto({
                placeholder: 'Buscar ...',
                alCambiar: texto => {
                    let filtro = {
                        __contiene__: { nombre: texto, codigo: texto }
                    };

                    if (texto.length === 0) filtro = { todos: true }

                    this.buscar(filtro)
                }
            }).render(),
            BotonPrincipal({
                titulo: 'Crear Materia Prima',
                alClick: () => this.crear()
            })
        );

        return cabecera;
    }

    listadoCabecera() {
        return $(`<div>
            <label class="codigo">Codigo</label>
            <label class="nombre">Nombre</label>
            <label class="precio">Precio</label>
            <label class="cantidad">Cantidad</label>
            <label class="editar"></label>
        </div>`);
    }

    listadoFila(obj) {
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

    formularioCreacion(datos) { return this.formulario(datos) }

    formularioEdicion(datos) { return this.formulario(datos) }

    formulario(datos) {
        return [
            Input.Texto({ titulo: 'Codigo', valor: datos.codigo, alCambiar: t => datos.codigo = t }).render(),
            Input.Texto({ titulo: 'Nombre', valor: datos.nombre, alCambiar: t => datos.nombre = t }).render(),
            Input.Numero({ titulo: 'Precio', valor: datos.precio, alCambiar: t => datos.precio = t }).render(),
            Input.Numero({ titulo: 'Cantidad', valor: datos.cantidad, alCambiar: t => datos.cantidad = t }).render(),
            Seleccion.Opciones({ titulo: 'Unidad de Medida', valor: datos.unidad, alCambiar: t => datos.unidad = t, opciones: [
                { titulo: 'Masa (gramos)', valor: 'masa' },
                { titulo: 'Volumen (mililitros)', valor: 'volumen' },
                { titulo: 'Unitario', valor: 'unitario' },
            ]}).render(),
        ]
    }
}