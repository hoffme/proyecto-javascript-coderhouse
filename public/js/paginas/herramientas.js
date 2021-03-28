class PaginaHerramientas extends Crud {
    constructor(repoHerramientas) { super('Herramientas', repoHerramientas) }

    filtrador() {
        const cabecera = $('<div><div>');

        cabecera.append(
            Texto({
                placeholder: 'Buscar ...',
                alCambiar: texto => {
                    let filtro = {
                        __contiene__: { nombre: texto, codigo: texto }
                    };

                    if (texto.length === 0) filtro = { todos: true }

                    this.buscar(filtro)
                }
            }),
            BotonPrincipal({
                titulo: 'Crear Herramienta',
                alClick: () => this.crear()
            })
        );

        return cabecera;
    }

    listadoCabecera() {
        return $(`<div>
            <label class="codigo">Codigo</label>
            <label class="nombre">Nombre</label>
            <label class="consumo">Consumo</label>
            <label class="editar"></label>
        </div>`);
    }

    listadoFila(obj) {
        const ctn = $(`<div class="listado-fila">
            <label class="codigo">${obj.codigo}</label>
            <label class="nombre">${obj.nombre}</label>
            <label class="consumo">$ ${obj.consumo}</label>
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
            Texto({ titulo: 'Codigo', valor: datos.codigo, alCambiar: t => datos.codigo = t }),
            Texto({ titulo: 'Nombre', valor: datos.nombre, alCambiar: t => datos.nombre = t }),
            Numero({ titulo: 'Consumo', placeholder: 'Watts/Hora', valor: datos.consumo, alCambiar: t => datos.consumo = t }),
            Numero({ titulo: 'Capacidad', valor: datos.capacidad, alCambiar: t => datos.capacidad = t }),
            Seleccion({ titulo: 'Unidad de Capacidad', valor: datos.unidad, alCambiar: t => datos.unidad = t, opciones: [
                { titulo: 'Masa (gramos)', valor: 'masa' },
                { titulo: 'Volumen (mililitros)', valor: 'volumen' },
                { titulo: 'Latas (Medianas)', valor: 'lat-med' },
                { titulo: 'Latas (Grandes)', valor: 'lat-gra' }
            ]}),        
        ]
    }
}