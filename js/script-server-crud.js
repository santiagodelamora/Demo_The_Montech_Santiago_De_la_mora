/*
    Función del archivo: Archivo que recive los datos de la base de datos desde el servidor y crea las filas y columnas en el cliente
    Nombre del archivo: script-client-crud.js
    Autor: Santiago Nicolás De la mora Núñez
    Fecha de creación del archivo: 26/7/2024
*/

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import database from './connection';

const expressApp = express();

// Se define un puerto en el que el servidor escuchará las solicitudes
const port = 3000;

expressApp.use(bodyParser.json());

expressApp.use(express.static('public'));

// Crear
expressApp.post('/crud', (request, response) => {
    const {username, email, password, addedAt} = request.body;
    const sql = `INSERT INTO sign_up (username, email, password, added_at) VALUES (?, ?, ?, ?)`;
    database.query(sql, [username, email, password, addedAt], (error, result) => {
        if (error)
        {
            console.error("Error al crear el registro.", error);
            response.status(500).send("Error al crear el registro.");
            return;
        }
        response.status(201).send(`Registro creado con ID ${result.id}`);
    });
});

// Leer
expressApp.get('/crud', (request, response) => {
    const sql = `SELECT * FROM sign_up`;
    database.query(sql, (error, results) => {
        if (error)
        {
            console.error("Error al leer los registros.", error);
            response.status(500).send("Error al leer los registros.");
            return;
        }
        response.json(results)
    });
});

// Actualizar
expressApp.put('/crud', (request, response) => {
    const {id} = request.params;
    const {username, email, password, addedAt} = request.body;
    const sql = `UPDATE sign_up SET username = ?, email = ?, password = ?, added_at = ? WHERE id = ?`;
    database.query(sql, [username, email, password, addedA, id], (error, result) => {
        if (error)
        {
            console.error("Error al actualizar el registro.", error);
            response.status(500).send("Error al acutalizar el registro.");
            return;
        }
        response.send("Registro actualizado correctamente.")
    });
});

// Eliminar
expressApp.delete('/crud', (request, response) => {
    const {id} = request.params;
    const sql = `DELETE FROM sign_up WHERE id = ?`;
    database.query(sql, [id], (error, result) => {
        if (error)
        {
            console.error("Error al eliminar el registro.", error);
            response.status(500).send("Error al eliminar el registro.");
            return;
        }
        response.send("Registro eliminado exitosamente.");
    })
});

expressApp.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});