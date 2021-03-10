class Repositorio {
    constructor(ruta) {
        this.ruta = ruta;
        this._datos = {};

        this.descargarDatos();
    }

    descargarDatos() {
        this._datos = JSON.parse(localStorage.getItem(this.ruta));
        if (!this._datos) this._datos = {};
    }

    cargarDatos() {
        localStorage.setItem(this.ruta, JSON.stringify(this._datos));
    }

    obtener(valor, filtrado) {
        return Object.values(this._datos).filter(obj => filtrado(valor, obj));
    }

    crear(obj, actualizar = false) {
        if (!actualizar && this._datos[obj.id]) {
            throw new Error("Existe un objeto con el id: '" + obj.id + "'");
        }

        this._datos[obj.id] = obj;
        this.cargarDatos();
    }

    actualizar(obj, crear = false) {
        if (!crear && !this._datos[obj.id]) {
            throw new Error("No existe un objeto con el id: '" + obj.id + "'");
        }

        this._datos[obj.id] = obj;
        this.cargarDatos();
    }

    remover(obj) {
        delete this._datos[obj.id];
        this.cargarDatos();
    }
}