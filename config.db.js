const mysql = require('mysql2');
let connection;

try {
    connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Mysql1208',
        database: 'appudem'
    });
} catch (error) {
    console.log("Error al conectar con la base de datos");
}

module.exports = {connection};