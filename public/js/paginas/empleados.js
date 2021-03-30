class PaginaEmpleados extends Crud {
    constructor(repoEmpleados) { super('Empleados', repoEmpleados) }

    filtrador() {
        const cabecera = $('<div><div>');

        cabecera.append(
            Input.Texto({
                placeholder: 'Buscar ...',
                alCambiar: texto => {
                    let filtro = {
                        __contiene__: { nombre: texto }
                    };

                    if (texto.length === 0) filtro = { todos: true }

                    this.buscar(filtro)
                }
            }).render(),
            BotonPrincipal({
                titulo: 'Crear Empleado',
                alClick: () => this.crear()
            })
        );

        return cabecera;
    }

    listadoCabecera() {
        return $(`<div>
            <label class="nombre">Nombre</label>
            <label class="cargo">Cargo</label>
            <label class="horas">Horas Semanales</label>
            <label class="salario">Salario Mensual</label>
            <label class="editar"></label>
        </div>`);
    }

    listadoFila(obj) {
        const ctn = $(`<div class="listado-fila">
            <label class="nombre">${obj.nombre}</label>
            <label class="cargo">${obj.cargo}</label>
            <label class="horas">${obj.horas_semanales}</label>
            <label class="salario">$ ${obj.salario}</label>
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
            Input.Numero({ titulo: 'Horas Semanales', valor: datos.horas_semanales, alCambiar: t => datos.horas_semanales = t }).render(),
            Input.Numero({ titulo: 'Salario Mensual', valor: datos.salario, alCambiar: t => datos.salario = t }).render(),
            Seleccion.Opciones({ titulo: 'Cargo', valor: datos.cargo, alCambiar: t => datos.cargo = t, opciones: [
                { titulo: 'Vendedor', valor: 'vendedor' },
                { titulo: 'Panadero', valor: 'panadero' },
                { titulo: 'Repostero', valor: 'repostero' },
                { titulo: 'Cocinero', valor: 'cocinero' },
                { titulo: 'Encargado', valor: 'encargado' },
                { titulo: 'Gerente', valor: 'gerente' },
            ]}).render(),
        ]
    }
}