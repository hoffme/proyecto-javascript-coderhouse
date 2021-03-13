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
        // this._datos = JSON.parse(localStorage.getItem(this.ruta));

        $.ajax({
            method: "GET",
            url:    `/api/repo/${this.ruta}`,
            success: (res) => {
                console.log(res)

                if (res.error) {
                    this._datos = {};
                    return;
                }

                this._datos = res.datos;
            }
        });
    }

    cargarDatos() {
        // localStorage.setItem(this.ruta, JSON.stringify(this._datos));

        $.ajax({
            method: "POST",
            contentType: 'application/json',
            url:    `/api/repo/${this.ruta}`,
            data:   JSON.stringify(this._datos),
            success: (res) => { console.log(res) }
        });
    }

    obtener(filtro, filtrador) {
        return Object.values(this._datos).filter(obj => filtrador(filtro, obj));
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