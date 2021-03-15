const uuid = require('uuid');

class Repositorio {
    constructor() { this._datos = {} }

    async obtener(filtro) {
        /*
            filtro: {
                id: string
                ids: string[]
                ...
            }
        */
        return Object.values(this._datos).filter(obj => {
            if (filtro.todos === true) return true;
            
            if (filtro.id && obj.id === filtro.id) return true;
            if (filtro.ids && filtro.ids.includes(obj.id)) return true;
            
            return false;
        });
    }

    async crear(obj) {
        if (obj.id && obj.id in this._datos) return;

        const id = uuid.v4();
        while (id in this._datos) id = uuid.v4();

        this._datos[id] = {...obj, id};

        return this._datos[id];
    }

    async actualizar(id, obj) {
        if (!id in this._datos) {
            throw new Error("No existe un objeto con el id: '" + id + "'");
        }

        this._datos[id] = {...this._datos[id], ...obj};
        
        return this._datos[id];
    }

    async remover(id) { delete this._datos[id]; }
}

exports.Repositorio = Repositorio;