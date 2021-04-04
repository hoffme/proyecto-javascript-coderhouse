class RepositorioBusqueda {
    constructor(repositorios, parser = () => {}) {
        this.repositorios = repositorios;
        this.parsear = parser;
    }

    async obtener(filtro = {}) {
        return this.repositorios.reduce((resultado, repo) => {
            const datos = await repo.obtener(filtro);

            resultado.push(...(datos.map(dato => {
                if (!this.parsear) return dato;
                return this.parsear(dato);
            })))

            return resultado;
        });
    }
}