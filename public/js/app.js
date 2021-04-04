class App {
    constructor(idRaiz) {
        this.raiz = $(`#${idRaiz}`);

        this.api_uri = 'http://localhost:3000/api';

        this.repositorios = {
            herramientas: new Repositorio(this.api_uri, 'herramientas'),
            materia_prima: new Repositorio(this.api_uri, 'materia_prima'),
            recetas: new Repositorio(this.api_uri, 'recetas')
        }

        this.repositorios.ingredientes = new RepositorioWrapper([
            this.repositorios.recetas,
            this.repositorios.materia_prima
        ])

        this.paginas = [
            new PaginaCalculadora(),
            new PaginaRecetas(this.repositorios.recetas, this.repositorios.ingredientes, this.repositorios.herramientas),
            new PaginaMateriaPrima(this.repositorios.materia_prima),
            new PaginaHerramientas(this.repositorios.herramientas),
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