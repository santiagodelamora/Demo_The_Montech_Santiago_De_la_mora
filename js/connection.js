/*
    Función del archivo: Conexión a la base de datos. Módulo para exportación
    Nombre del archivo: connection.js
    Autor: Santiago Nicolás De la mora Núñez
    Fecha de creación del archivo: 26/7/2024
*/

// Cliente de MySQL para Node.js
import mysql from 'mysql';

// Configura la conexión a la base de datos MySQL
export default database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_demo_santiago'
});