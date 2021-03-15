class Repositorio {
    constructor(nombre) { this.nombre = nombre }

    obtener(filtro = {}) {
        return new Promise((resolve, reject) => {
            $.ajax({
                method: "GET",
                contentType: 'application/json',
                url:    `/api/repo/${this.nombre}?${$.param(filtro)}`,
                success: (res) => {
                    if (res.error) reject(res.error);
                    resolve(res.datos);
                },
                error: reject
            });
        })
    }

    crear(obj) {
        return new Promise((resolve, reject) => {
            $.ajax({
                method: "POST",
                contentType: 'application/json',
                url:    `/api/repo/${this.nombre}`,
                data:   JSON.stringify(obj),
                success: (res) => {
                    if (res.error) reject(res.error);
                    resolve(res.datos);
                },
                error: reject
            });
        })
    }

    actualizar(obj) {
        return new Promise((resolve, reject) => {
            $.ajax({
                method: "PUT",
                contentType: 'application/json',
                url:    `/api/repo/${this.nombre}/${obj.id}`,
                data:   JSON.stringify(obj),
                success: (res) => {
                    if (res.error) reject(res.error);
                    resolve(res.datos);
                },
                error: reject
            });
        })
    }

    remover(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                method: "DELETE",
                contentType: 'application/json',
                url:    `/api/repo/${this.nombre}/${id}`,
                success: (res) => {
                    if (res.error) reject(res.error);
                    resolve(res.datos);
                },
                error: reject
            });
        })
    }
}