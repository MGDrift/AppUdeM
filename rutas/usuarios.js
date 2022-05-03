const express = require("express");
const app = express();

//conexión con la base de datos
const {connection} = require("../config.db");

const getUsuarios = (request, response) => {
    connection.query("SELECT * FROM usuarios", 
    (err, results) => {
        if(err)
            throw err;
        response.status(200).json(results);
    });
};

//ruta
app.route("/usuarios")
.get(getUsuarios);


const postUsuario = (request, response) => {
    const {cedula, nombre, apellido, ramaInstitucional} = request.body;
    connection.query("SELECT * FROM usuarios WHERE cedula = ?", 
    [cedula],
    (err, results) => {
        if(err)
            throw err;
        if (results.length > 0) {
            response.status(200).json({ mensaje: "El usuario ya existe" })
        } else {
            connection.query("INSERT INTO usuarios(cedula, nombre, apellido, ramaInstitucional) VALUES (?,?,?,?) ", 
            [cedula, nombre, apellido, ramaInstitucional],
            (err, results) => {
                if(err)
                    throw err;
                response.status(201).json({ mensaje: "Usuario creado satisfactoriamente", data: results });
            });
        }
    })
};

//ruta
app.route("/usuarios")
.post(postUsuario);


const delUsuario = (request, response) => {
    const cedula = request.params.cedula;
    connection.query("DELETE FROM usuarios WHERE cedula = ?", 
    [cedula],
    (err, results) => {
        if(err)
            throw err;
        response.status(201).json({"Item eliminado": results.affectedRows});
    });
};

//ruta
app.route("/usuarios/:cedula")
.delete(delUsuario);


module.exports = app;