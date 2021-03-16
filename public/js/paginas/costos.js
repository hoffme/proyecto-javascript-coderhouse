class PaginaCostos extends Crud {
    constructor() { super('Costos', contexto.repositorios.costos) }

    filaCabecera() {
        return $(`<div>
            <label class="nombre">Nombre</label>
            <label class="empresa">Empresa</label>
            <label class="importe">Importe</label>
            <label class="periodisidad">Periodisidad</label>
            <label class="editar"></label>
        </div>`);
    }

    fila(obj) {
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

    cabeceraBusqueda() {
        const cabecera = $('<div><div>');

        cabecera.append(
            Texto({
                placeholder: 'Buscar ...',
                alCambiar: texto => {
                    let filtro = {
                        __contiene__: { nombre: texto, empresa: texto }
                    };

                    if (texto.length === 0) filtro = { todos: true }

                    this.buscar(filtro)
                }
            }),
            BotonPrincipal({
                titulo: 'Crear Costo Fijo',
                alClick: () => this.crear()
            })
        );

        return cabecera;
    }

    formularioCreacion(datos) { return this.formulario(datos) }

    formularioEdicion(datos) { return this.formulario(datos) }

    formulario(datos) {
        return [
            Texto({ titulo: 'Nombre', valor: datos.nombre, alCambiar: t => datos.nombre = t }),
            Texto({ titulo: 'Empresa', valor: datos.empresa, alCambiar: t => datos.empresa = t }),
            Numero({ titulo: 'Importe', valor: datos.importe, alCambiar: t => datos.importe = t }),
            Seleccion({ titulo: 'Periodisidad', valor: datos.periodisidad, alCambiar: t => datos.periodisidad = t, opciones: [
                { titulo: 'Diaria', valor: 'diaria' },
                { titulo: 'Semanal', valor: 'semanal' },
                { titulo: 'Mensual', valor: 'mensual' },
                { titulo: 'Sin Periodo', valor: '-' },
            ]}),
        ]
    }
}