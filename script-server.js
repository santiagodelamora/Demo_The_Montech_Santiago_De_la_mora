/*
    Función del archivo: Lógica backend del registro de cuentas y el inicio de sesión
    Nombre del archivo: script-server.js
    Autor: Santiago Nicolás De la mora Núñez
    Fecha de creación del archivo; 3/7/2024
*/

// Importación de los módulos necesarios
import express from 'express';   // Framework para crear aplicaciones web y API
import bodyParser from 'body-parser';   // Middleware para analizar cuerpos de solicitud entrantes en un servidor Express
import cors from 'cors';   // Middleware para permitir solicitudes de recursos cruzados
import mysql from 'mysql';   // Cliente de MySQL para Node.js

// Crea la apliación Express
const expressApp = express();

// Se define un puerto en el que el servidor escuchará las solicitudes
const port = 3000;

// Permite que las solicitudes de diferentes dominios sean aceptadas por el servidor
expressApp.use(cors());

// Permite que el servidor entienda las solicitudes que tienen cuerpos en formato JSON
expressApp.use(bodyParser.json());

// Configura la conexión a la base de datos MySQL
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_demo_santiago'
});

// Método para iniciar la conexión a la base de datos. Si hay algún error, se imprimie un mensaje de error en la consola y se detiene la ejecución
database.connect((error) => {
    if (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
    console.log("Conectado a la base de datos MySQL.");
});

// Define una ruta para manejar las solicitudes POST en '/submit'
expressApp.post('/login-demo', (request, response) => {
    // Inicialización de variables
    let receivedData = null;
    let sql = null;

    switch (request.body.formType)
    {
        // Maneja el registro de los datos en la base de datos del formulario de creación de cuenta
        case 'sign up form':
            // Extrae los datos del cuerpo de la solicitud. El dato que se envió desde el cliente mediante fetch
            receivedData = [
                request.body.username,
                request.body.email,
                request.body.password
            ];

            // Crea una consulta SQL preparada para insertar los datos en la base de datos
            sql = `INSERT INTO sign_up (username, email, password, added_at) VALUES (?, ?, ?, ?)`;

            // Ejecuta la consulta creada anteriormente. Si hay algún error durante la inserción, se envía una respuesta con estado 500 (error del servidor) y un mensaje JSON al cliente.
            // En caso contrario, se envíar una respuesta con estado 200 (OK) y se envía un mensaje al cliente
            database.query(sql, [receivedData[0], receivedData[1], receivedData[2], new Date()], (error, result) => {
                if (error)
                {
                    console.error("Error al insertar los datos en la tabla.", error);
                    response.status(500).json({success: false, message: "Error al insertar los datos en la tabla."});
                    console.log(result);
                }
                else
                {
                    console.log("Datos insertados correctamente en la tabla.", result);
                    response.status(200).json({success: true, message: "Datos registrados exitosamente."});
                    console.log(result);
                }
            });
        break;

        // Maneja el registro de los datos en la base de datos del formulario de inicio de sesión
        case 'sign in form':
            // Extrae los datos del cuerpo de la solicitud. El dato que se envió desde el cliente mediante fetch
            receivedData = [
                request.body.email,
                request.body.password
            ];

            sql = `SELECT * FROM sign_up WHERE email = ?`;

            database.query(sql, [receivedData[0]], (error, results) => {
                if (error)
                {
                    console.error("Error al consultar los datos de la tabla.", error);
                    response.status(500).json({success: false, message: "Error al consultar los datos de la tabla."});
                    console.log(results);
                }
                
                if (results.length < 1)
                {
                    response.status(401).json({success: false, message: "Correo electrónico no encontrado."});
                    console.log(results);
                }
                else
                {
                    const rowFound = results[0];

                    if (receivedData[1] !== rowFound['password']) {
                        response.status(401).json({success: false, message: "Contraseña incorrecta."});
                    }
                    else
                    {
                        response.status(200).json({success: true, message: "Inicio de sesión exitoso."});

                        // Crea una consulta SQL preparada para insertar los datos en la base de datos
                        sql = `INSERT INTO sign_in (email, password, added_at) VALUES (?, ?, ?)`;

                        // Ejecuta la consulta creada anteriormente. Si hay algún error durante la inserción, se envía una respuesta con estado 500 (error del servidor) y un mensaje JSON al cliente.
                        // En caso contrario, se envíar una respuesta con estado 200 (OK) y se envía un mensaje al cliente
                        database.query(sql, [receivedData[0], receivedData[1], new Date()], (error, result) => {
                            if (error)
                            {
                                console.error("Error al insertar los datos en la tabla.", error);
                                response.status(500).json({success: false, message: "Error al insertar los datos en la tabla."});
                                console.log(result);
                            }
                            else
                            {
                                console.log("Datos insertados correctamente en la tabla.", result);
                                response.status(200).json({success: true, message: "Datos registrados exitosamente."});
                                console.log(result);
                            }
                        });
                    }
                }
            });
        break;
    }
});

// Inicia el servidor
expressApp.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});