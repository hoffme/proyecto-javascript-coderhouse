class RepositorioWrapper {
    constructor(repositorios, parser) {
        this.repositorios = repositorios;
        this.parsear = parser;
    }

    async obtener(filtro = {}) {
        const resultados = [];

        for (const repo of this.repositorios) {
            const datos = await repo.obtener(filtro);

            datos.forEach(dato => {
                return resultados.push(this.parsear ? this.parsear(repo, dato) : dato)
            });
        }

        return resultados;
    }
}