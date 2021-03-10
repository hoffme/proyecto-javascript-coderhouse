class PaginaEmpleados extends Pagina {
    constructor() { super('Empleados') }

    _contenido() {
        const crud = new CRUDVista(
            REPOSITORIOS.empleados,
            [ 'nombre' ],
            [ 'id', 'nombre', 'apellido', 'horas', 'salario' ],
            [
                { titulo: 'ID', nombre: 'id', tipo: 'numero'},
                { titulo: 'Nombre', nombre: 'nombre', tipo: 'texto'},
                { titulo: 'Apellido', nombre: 'apellido', tipo: 'texto'},
                { titulo: 'Horas Diarias', nombre: 'horas diarias', tipo: 'numero'},
                { titulo: 'Salario', nombre: 'salario', tipo: 'numero'},
                { titulo: 'DNI', nombre: 'dni', tipo: 'numero'},
            ]
        );

        return crud.render();
    }
}