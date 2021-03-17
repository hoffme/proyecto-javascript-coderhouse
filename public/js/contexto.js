const API_URI = 'https://recetas-coderhouse.herokuapp.com/api';

const contexto = {
    repositorios: {
        costos: new Repositorio(API_URI, 'costos'),
        empleados: new Repositorio(API_URI, 'empleados'),
        herramientas: new Repositorio(API_URI, 'herramientas'),
        provedores: new Repositorio(API_URI, 'provedores'),
        materia_prima: new Repositorio(API_URI, 'materia_prima'),
        recetas: new Repositorio(API_URI, 'recetas')
    }
}