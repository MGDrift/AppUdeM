const express = require("express");
const app = express();

//conexión con la base de datos
const {connection} = require("../config.db");

const getEventos = (request, response) => {
    connection.query("SELECT * FROM eventos",
    (err, results) => {
        if(err)
            throw err;
        response.status(200).json(results);
    });
};

//ruta
app.route("/eventos")
.get(getEventos);

const getEvento = (request, response) => {
    const id = request.params.id;
    connection.query("SELECT * FROM eventos WHERE id = ?",
    [id],
    (err, results) => {
        if(err)
            throw err;
        if (results.length > 0) {
            response.status(200).json({ mensaje: "", data: results });
        } else {
            response.status(404).json({ mensaje: "El evento no existe" })
        }
    });
};

//ruta
app.route("/eventos/:id")
.get(getEvento);

const postEvento = (request, response) => {
    const {id, titulo, fecha, lugar, descripcion} = request.body;
    connection.query("SELECT * FROM eventos WHERE id = ?", 
    [id],
    (err, results) => {
        if(err)
            throw err;
        if (results.length > 0) {
            response.status(200).json({ mensaje: "El evento ya existe" })
        } else {
            connection.query("INSERT INTO eventos(id, titulo, fecha, lugar, descripcion) VALUES (?,?,?,?,?) ", 
            [id, titulo, fecha, lugar, descripcion],
            (err, results) => {
                if(err)
                    throw err;
                response.status(201).json({ mensaje: "Evento creado satisfactoriamente", data: results });
            });
        }
    })
};

//ruta
app.route("/eventos")
.post(postEvento);


const delEvento = (request, response) => {
    const id = request.params.id;
    connection.query("DELETE FROM eventos WHERE id = ?", 
    [id],
    (err, results) => {
        if(err)
            throw err;
        response.status(201).json({"Item eliminado": results.affectedRows});
    });
};

//ruta
app.route("/eventos/:id")
.delete(delEvento);


module.exports = app;