const express = require("express");
const app = express();

//nos ayuda a analizar el cuerpo de la solicitud POST
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'))

// Cargar home page.
app.get('/', function(req, res) {
    res.sendFile('./public/index.html');
});

//cargamos el archivo de rutas
app.use(require('./rutas/usuarios.js'));
app.use(require('./rutas/eventos.js'));

app.listen(3300, () => {
    console.log("Servidor corriendo en el puerto 3300");
});

module.exports = app;