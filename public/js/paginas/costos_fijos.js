class PaginaCostosFijos extends Crud {
    constructor() { super('Costos Fijos', contexto.repositorios.costos) }

    filtroBusqueda(filtro, obj) {
        if (
            Object.keys(filtro).length === 0 ||
            filtro.query === ''
        ) return true;
        
        if (filtro.query) {
            if (obj.nombre && obj.nombre.toLowerCase().includes(filtro.query.toLowerCase())) return true;
            if (obj.empresa && obj.empresa.toLowerCase().includes(filtro.query.toLowerCase())) return true;
        }

        return false;
    }

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

    cabeceraBusqueda(contenedor) {
        contenedor.append(
            Texto({
                placeholder: 'Buscar ...',
                alCambiar: texto => this.buscar({ query: texto })
            }),
            BotonPrincipal({
                titulo: 'Crear Costo Fijo',
                alClick: () => this.crear()
            })
        );
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