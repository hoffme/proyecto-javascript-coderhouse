class App {
    constructor(idRaiz) {
        this.raiz = $(`#${idRaiz}`);

        this.api_uri = 'http://localhost:3000/api';

        this.repositorios = {
            costos: new Repositorio(this.api_uri, 'costos'),
            empleados: new Repositorio(this.api_uri, 'empleados'),
            herramientas: new Repositorio(this.api_uri, 'herramientas'),
            provedores: new Repositorio(this.api_uri, 'provedores'),
            materia_prima: new Repositorio(this.api_uri, 'materia_prima'),
            recetas: new Repositorio(this.api_uri, 'recetas')
        }

        this.paginas = [
            new PaginaRecetas(this.repositorios.recetas),
            new PaginaMateriaPrima(this.repositorios.materia_prima),
            new PaginaProvedores(this.repositorios.provedores),
            new PaginaHerramientas(this.repositorios.herramientas),
            new PaginaEmpleados(this.repositorios.empleados),
            new PaginaCostos(this.repositorios.costos)
        ]

        this.navegacion = new Navegacion(this.paginas.map((pagina, indice) => {
            return {
                titulo: pagina.nombre,
                alSeleccionar: () => this.abrir(indice),
                alDeseleccionar: () => this.cerrar(indice)
            }
        }));
        this.raiz.prepend(this.navegacion.render());

        this.navegacion.seleccionar(0);
    }

    abrir(indicePagina) {
        this.paginas[indicePagina].abrir();
        this.raiz.append(this.paginas[indicePagina].render());
    }

    cerrar(indicePagina) {
        this.paginas[indicePagina].cerrar();
        this.paginas[indicePagina].ctn.remove();
    }
}