class PaginaMateriaPrima extends Crud {
    constructor(repoMateriaPrima) {
        super('Materia Prima', repoMateriaPrima);
        
        const campos_variacion = {
            marca: Input.Texto({ titulo: 'Marca' }),
            precio: Input.Numero({ titulo: 'Precio' }),
            cantidad: Input.Numero({ titulo: 'Cantidad' }),
            medida: Seleccion.Opciones({ titulo: 'Medida', opciones: {
                'grs': 'Gramos',
                'mlt' : 'Mililitros'
            }})
        }

        const campos = {
            nombre: Input.Texto({ titulo: 'Nombre' }),
            variaciones: new Arreglo({
                titulo: 'Variaciones',
                vista: datos => [
                    $(`<label>${datos.marca}</label>`),
                    $(`<label>$ ${datos.precio}</label>`),
                    $(`<label>${datos.cantidad} ${datos.medida}</label>`)
                ],
                formulario_creacion: new Formulario({ campos: campos_variacion }),
                formulario_edicion: new Formulario({ campos: campos_variacion })
            })
        };

        this.formulario_creacion.campos = campos;
        this.formulario_edicion.campos = campos;
    }

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
            <label class="nombre">Nombre</label>
            <label class="precio-min">Precio Min</label>
            <label class="precio-max">Precio Max</label>
            <label class="editar"></label>
        </div>`);
    }

    listadoFila(obj) {
        const costo = (variacion) => variacion.precio / variacion.cantidad;
        const ordenadoPorPrecios = [...obj.variaciones].sort((a, b) => costo(a) < costo(b));

        const ctn = $(`<div class="listado-fila">
            <label class="nombre">${obj.nombre}</label>
        </div>`);

        if (ordenadoPorPrecios.length > 0) {
            const var_max = ordenadoPorPrecios[ordenadoPorPrecios.length - 1];
            const var_min = ordenadoPorPrecios[0];

            ctn.append(`
                <label class="precio-menor">${var_min.precio / var_min.cantidad} $/${var_min.medida}</label>
                <label class="precio-menor">${var_max.precio / var_max.cantidad} $/${var_max.medida}</label>
            `);
        }

        const editar = $('<button>Editar</button>');
        editar.click(() => this.editar(obj));
        ctn.append(editar);

        return ctn;
    }
}