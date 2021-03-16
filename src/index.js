const express = require('express');
const repositorio = require('./repositorio');

const app = express();
const port = 3000;
const debug = true;

const repoitorios = {
    costos: new repositorio.Repositorio(),
    empleados: new repositorio.Repositorio(),
    herramientas: new repositorio.Repositorio(),
    provedores: new repositorio.Repositorio(),
    materia_prima: new repositorio.Repositorio(),
    recetas: new repositorio.Repositorio()
};

const log = (texto, salto = true) => {
    if (salto) console.log(texto);
    else { process.stdout.write(texto) }
}

app.use(express.json());

app.get('/api/repo/:nombre', async (req, res) => {
    const nombre = req.params.nombre;
    const filtro = Object.entries(req.query).reduce((filtro, [campo, valor]) => {
        filtro[campo] = valor;

        if (['true', 'false'].includes(valor)) filtro[campo] = valor === 'true' ? true : false;

        return filtro;
    }, {});

    if (debug) {
        log('\n > OBTENER:')
        log(`\trepo: ${nombre}`)
        log("\tfiltro: ", false);
        log(filtro);
    }

    const repositorio = repoitorios[nombre];
    if (!repositorio) {
        res.send({error: `el repositorio ${nombre} no existe`});
    }

    const datos = await repositorio.obtener(
        (Object.keys(filtro).length > 0) ? filtro : { todos: true }
    );

    if (debug) {
        log('\tresultados: ', false);
        log(datos);
    }

    res.send({ datos });
})

app.post('/api/repo/:nombre', express.json(), async (req, res) => {
    const nombre = req.params.nombre;
    const campos = req.body;

    if (debug) {
        log('\n > CREAR:')
        log(`\trepo: ${nombre}`)
        log("\tcampos: ", false);
        log(campos);
    }

    const repositorio = repoitorios[nombre];
    if (!repositorio) {
        res.send({error: `el repositorio ${nombre} no existe`});
    }

    const datos = await repositorio.crear(campos);

    if (debug) {
        log('\tresultados: ', false);
        log(datos);
    }
    
    res.send({ datos });
})

app.put('/api/repo/:nombre/:id', express.json(), async (req, res) => {
    const nombre = req.params.nombre;
    const id = req.params.id;
    const campos = req.body;

    if (debug) {
        log('\n > ACTUALIZAR:')
        log(`\trepo: ${nombre}`)
        log(`\tid: ${id}`)
        log("\tcampos: ", false);
        log(campos);
    }

    const repositorio = repoitorios[nombre];
    if (!repositorio) {
        res.send({error: `el repositorio ${nombre} no existe`});
    }

    const datos = await repositorio.actualizar(id, campos);

    if (debug) {
        log('\tresultados: ', false);
        log(datos);
    }

    res.send({ datos });
})

app.delete('/api/repo/:nombre/:id', async (req, res) => {
    const nombre = req.params.nombre;
    const id = req.params.id;

    if (debug) {
        log('\n > REMOVER:')
        log(`\trepo: ${nombre}`)
        log(`\tid: ${id}`)
    }

    const repositorio = repoitorios[nombre];
    if (!repositorio) {
        res.send({error: `el repositorio ${nombre} no existe`});
    }

    await repositorio.remover(id);
    
    if (debug) log('\tresultados: ok');

    res.send({});
})

app.use(express.static(__dirname + './../public'));

app.listen(port, () => {
    log(`Listening at http://localhost:${port}`)
})