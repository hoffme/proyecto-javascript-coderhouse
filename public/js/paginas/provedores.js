class PaginaProvedores extends Crud {
    constructor() { super('Provedores', contexto.repositorios.provedores) }

    filaCabecera() {
        return $(`<div>
            <label class="nombre">Nombre</label>
            <label class="ciudad">Ciudad</label>
            <label class="direccion">Direccion</label>
            <label class="editar"></label>
        </div>`);
    }

    fila(obj) {
        const ctn = $(`<div class="listado-fila">
            <label class="nombre">${obj.nombre}</label>
            <label class="ciudad">${obj.ciudad}</label>
            <label class="direccion">${obj.direccion}</label>
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
                        __contiene__: { nombre: texto }
                    };

                    if (texto.length === 0) filtro = { todos: true }

                    this.buscar(filtro)
                }
            }),
            BotonPrincipal({
                titulo: 'Crear Provedor',
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
            Texto({ titulo: 'ciudad', valor: datos.ciudad, alCambiar: t => datos.ciudad = t }),
            Texto({ titulo: 'Direccion', valor: datos.direccion, alCambiar: t => datos.direccion = t }),
            Texto({ titulo: 'Nombre Contacto', valor: datos.nombre_contacto, alCambiar: t => datos.nombre_contacto = t }),
            Texto({ titulo: 'Telefono Contacto', valor: datos.telefono_contacto, alCambiar: t => datos.telefono_contacto = t }),
            Texto({ titulo: 'Correo Contacto', valor: datos.correo_contacto, alCambiar: t => datos.correo_contacto = t }),
        ]
    }
}