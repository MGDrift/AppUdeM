const express = require("express");
const app = express();

//conexión con la base de datos
const {connection} = require("../config.db");

const getEventosUsuario = (request, response) => {
    const cedula = request.params.cedula;
    connection.query("SELECT * FROM eventos_usuarios WHERE cedulaUsuario = ?", 
    [cedula],
    (err, results) => {
        if(err)
            throw err;
        response.status(200).json(results);
    });
};

//ruta
app.route("/eventosusuarios/:cedula")
.get(getEventosUsuario);

const getEventoUsuario = (request, response) => {
    const idEvento = request.params.idEvento;
    const cedula = request.params.cedula;
    connection.query("SELECT * FROM eventos_usuarios WHERE idEvento = ? AND cedulaUsuario = ?",
    [idEvento, cedula],
    (err, results) => {
        if(err)
            throw err;
        if (results.length > 0) {
            response.status(200).json({ mensaje: "", data: results });
        } else {
            response.status(404).json({ mensaje: "El usuario no esta registrado al evento" })
        }
    });
};

//ruta
app.route("/eventosusuarios/:idEvento/:cedula")
.get(getEventoUsuario);

const postEventoUsuario = (request, response) => {
    const {idEvento, cedula} = request.body;
    connection.query("SELECT * FROM eventos_usuarios WHERE idEvento = ? AND cedulaUsuario = ?", 
    [idEvento, cedula],
    (err, results) => {
        if(err)
            throw err;
        if (results.length > 0) {
            response.status(200).json({ mensaje: "El usuario ya está registrado al evento" })
        } else {
            connection.query("INSERT INTO eventos_usuarios(idEvento, cedulaUsuario) VALUES (?,?) ", 
            [idEvento, cedula],
            (err, results) => {
                if(err)
                    throw err;
                response.status(201).json({ mensaje: "Usuario se ha registrado al evento satisfactoriamente", data: results });
            });
        }
    })
};

//ruta
app.route("/eventosusuarios")
.post(postEventoUsuario);


const delEventoUsuario = (request, response) => {
    const idEvento = request.params.idEvento;
    const cedula = request.params.cedula;
    connection.query("DELETE FROM eventos_usuarios WHERE idEvento = ? AND cedulaUsuario = ?", 
    [idEvento, cedula],
    (err, results) => {
        if(err)
            throw err;
        response.status(201).json({ mensaje: "El usuario ya NO está registrado al evento" });
    });
};

//ruta
app.route("/eventosusuarios/:idEvento/:cedula")
.delete(delEventoUsuario);


module.exports = app;