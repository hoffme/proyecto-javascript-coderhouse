const express = require('express');

const app = express();
const port = 3000;

const repoitorios = {};

app.use(express.json());

app.get('/api/repo/:nombre', (req, res) => {
    const nombreRepo = req.params.nombre;

    const datos = nombreRepo in repoitorios ? repoitorios[nombreRepo] : {};

    res.send({ datos });
})

app.post('/api/repo/:nombre', express.json(), (req, res) => {
    const nombreRepo = req.params.nombre;
    const data = req.body;

    repoitorios[nombreRepo] = data;
    
    res.send({ datos: repoitorios[nombreRepo] });
})

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`Example api listening at http://localhost:${port}`)
})