/*
    Función del archivo: Archivo que recive los datos de la base de datos desde el servidor y crea las filas y columnas en el cliente
    Nombre del archivo: crud.js
    Autor: Santiago Nicolás De la mora Núñez
    Fecha de creación del archivo: 26/7/2024
*/

import express from 'express';
import database from '../models/connection.js';

// Crea el enrrutador Express
const router = express.Router();

/******* CREATE *******/
// Crear
router.post('/', (request, response) => {
    const formType = request.body.formType;
    let receivedData = [
        request.body.email,
        request.body.password
    ];

    let sql = null;

    switch (formType)
    {
        case 'sign up':
            receivedData.unshift(request.body.username);

            sql = `INSERT INTO sign_up (username, email, password, added_at) VALUES (?, ?, ?, ?)`;

            database.query(sql, [receivedData[0], receivedData[1], receivedData[2], new Date()], (error, result) => {
                if (error)
                {
                    console.error("Error al crear el registro.", error);
                    response.status(500).send(JSON.stringify({message: "Error al crear el registro."}));
                    return;
                }
                response.status(201).send(JSON.stringify({message: "Registro creado exitosamente."}));
            });
        break;

        case 'sign in':
            sql = `INSERT INTO sign_in (email, password, added_at) VALUES (?, ?, ?)`;

            database.query(sql, [receivedData[0], receivedData[1], new Date()], (error, result) => {
                if (error)
                {
                    console.error("Error al crear el registro.", error);
                    response.status(500).send(JSON.stringify({message: "Error al crear el registro. "}));
                    return;
                }
                response.status(201).send(JSON.stringify({message: "Registro creado exitosamente."}));
            });
        break;
    }
});

/******* READ *******/
// Leer
router.get('/', (request, response) => {
    const sql = `
        SELECT * FROM sign_up;
        SELECT * FROM sign_in;
    `;

    database.query(sql, (error, results) => {
        if (error)
        {
            console.error("Error al leer los registros.", error);
            response.status(500).send(JSON.stringify({message: "Error al leer los registros. Motivo: " + error}));
            return;
        }
        response.status(200).send(JSON.stringify(results));
    });
});

/******* UPDATE *******/
// Actualizar
router.put('/', (request, response) => {
    const formType = request.body.formType;
    let receivedData = [
        request.body.newEmail,
        request.body.newPassword,
        request.body.id
    ];

    let sql = null;

    switch(formType)
    {
        case 'sign up':
            receivedData.unshift(request.body.newUsername);

            sql = `UPDATE sign_up SET username = ?, email = ?, password = ?, added_at = ? WHERE id = ?`;

            database.query(sql, [receivedData[0], receivedData[1], receivedData[2], new Date(), receivedData[3]], (error, result) => {
                if (error)
                {
                    console.error("Error al actualizar el registro.", error);
                    response.status(500).send(JSON.stringify({message: "Error al acutalizar el registro. Motivo: " + error}));
                    return;
                }
                response.status(201).send(JSON.stringify({message: "Registro actualizado exitosamente."}));
            });
        break;

        case 'sign in':
            sql = `UPDATE sign_in SET email = ?, password = ?, added_at = ? WHERE id = ?`;

            database.query(sql, [receivedData[0], receivedData[1], new Date(), receivedData[2]], (error, result) => {
                if (error)
                {
                    console.error("Error al actualizar el registro.", error);
                    response.status(500).send(JSON.stringify({message: "Error al actualizar el registro. Motivo: " + error}));
                    return;
                }
                response.status(201).send(JSON.stringify({message: "Registro actualizado exitosamente."}));
            });
        break;
    }
});

/******* DELETE *******/
// Eliminar
router.delete('/', (request, response) => {
    const id = request.body.id;

    const sql = `
        DELETE FROM sign_up WHERE id = ?;
        DELETE FROM sign_in WHERE id = ?;
    `;

    database.query(sql, [id, id], (error, result) => {
        if (error)
        {
            console.error("Error al eliminar el registro.", error);
            response.status(500).send(JSON.stringify({message: "Error al eliminar el registro. Motivo: " + error}));
            return;
        }
        response.status(201).send(JSON.stringify({message: "Registro eliminado exitosamente."}));
    });
});

export default router;