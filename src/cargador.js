const datos = require('./datos');

const cargador = (repositorios) => {
    Object.entries(datos.Datos).forEach(([repo, datosRepo]) => {
        if (repositorios[repo]) {
            datosRepo.forEach(obj => repositorios[repo]._datos[obj.id] = obj)
        }
    })
}

exports.cargador = cargador;