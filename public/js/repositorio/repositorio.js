class Repositorio {
    constructor(ruta) {
        this.ruta = ruta;
        this._datos = {};

        this.descargarDatos();
    }

    nuevoId(obj) {
        const id = uuid.v4();
        while (id in this._datos) id = uuid.v4();
        obj.id = id;
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

    crear(obj) {
        this.nuevoId(obj);
        this._datos[obj.id] = {...obj};
        this.cargarDatos();
    }

    actualizar(obj) {
        if (!obj.id in this._datos) {
            throw new Error("No existe un objeto con el id: '" + obj.id + "'");
        }

        this._datos[obj.id] = {...obj};
        this.cargarDatos();
    }

    remover(obj) {
        delete this._datos[obj.id];
        this.cargarDatos();
    }
}