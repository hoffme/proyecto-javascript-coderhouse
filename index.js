const express = require('express');
const repositorio = require('./src/repositorio');

const app = express();
const port = 3000;

const repoitorios = {};

app.use(express.json());

app.get('/api/repo/:nombre', async (req, res) => {
    const nombre = req.params.nombre;
    const filtro = req.query;

    const repo = repoitorios[nombre];
    if (!repo) repoitorios[nombre] = new repositorio.Repositorio();

    const datos = await repoitorios[nombre].obtener(
        (Object.keys(filtro).length > 0) ? filtro : { todos: true }
    );

    res.send({ datos });
})

app.post('/api/repo/:nombre', express.json(), async (req, res) => {
    const nombre = req.params.nombre;
    const campos = req.body;

    const repositorio = repoitorios[nombre];
    if (!repoitorios) {
        res.send({error: `el repositorio ${nombre} no existe`});
    }

    const datos = await repositorio.crear(campos);
    
    res.send({ datos });
})

app.put('/api/repo/:nombre/:id', express.json(), async (req, res) => {
    const nombre = req.params.nombre;
    const id = req.params.id;
    const campos = req.body;

    const repositorio = repoitorios[nombre];
    if (!repoitorios) {
        res.send({error: `el repositorio ${nombre} no existe`});
    }

    const datos = await repositorio.actualizar(id, campos);
    
    res.send({ datos });
})

app.delete('/api/repo/:nombre/:id', async (req, res) => {
    const nombre = req.params.nombre;
    const id = req.params.id;

    const repositorio = repoitorios[nombre];
    if (!repoitorios) {
        res.send({error: `el repositorio ${nombre} no existe`});
    }

    await repositorio.remover(id);
    
    res.send({});
})

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})