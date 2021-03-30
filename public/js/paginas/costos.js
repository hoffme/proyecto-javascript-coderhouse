class PaginaCostos extends Crud {
    constructor(repoCostos) { super('Costos', repoCostos) }

    filtrador() {
        const cabecera = $('<div><div>');

        cabecera.append(
            Input.Texto({
                placeholder: 'Buscar ...',
                alCambiar: texto => {
                    let filtro = {
                        __contiene__: { nombre: texto, empresa: texto }
                    };

                    if (texto.length === 0) filtro = { todos: true }

                    this.buscar(filtro)
                }
            }).render(),
            BotonPrincipal({
                titulo: 'Crear Costo Fijo',
                alClick: () => this.crear()
            })
        );

        return cabecera;
    }

    listadoCabecera() {
        return $(`<div>
            <label class="nombre">Nombre</label>
            <label class="empresa">Empresa</label>
            <label class="importe">Importe</label>
            <label class="periodisidad">Periodisidad</label>
            <label class="editar"></label>
        </div>`);
    }

    listadoFila(obj) {
        const ctn = $(`<div class="listado-fila">
            <label class="nombre">${obj.nombre}</label>
            <label class="empresa">${obj.empresa}</label>
            <label class="importe">$ ${obj.importe}</label>
            <label class="periodisidad">${obj.periodisidad}</label>
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
            Input.Texto({ titulo: 'Nombre', valor: datos.nombre, alCambiar: t => datos.nombre = t }).render(),
            Input.Texto({ titulo: 'Empresa', valor: datos.empresa, alCambiar: t => datos.empresa = t }).render(),
            Input.Numero({ titulo: 'Importe', valor: datos.importe, alCambiar: t => datos.importe = t }).render(),
            Seleccion.Opciones({ titulo: 'Periodisidad', multiple:true, valor: datos.periodisidad, alCambiar: t => datos.periodisidad = t, opciones: {
                diaria: 'Diaria',
                semanal: 'Semanal',
                mensual: 'Mensual',
                sin: 'Sin Periodo',
            }}).render(),
        ]
    }
}