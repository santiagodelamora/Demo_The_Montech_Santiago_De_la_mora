/*
    Función del archivo: Lógica backend del registro de cuentas y el inicio de sesión
    Nombre del archivo: script-server.js
    Autor: Santiago Nicolás De la mora Núñez
    Fecha de creación del archivo: 3/7/2024
*/

// Importación de los módulos necesarios
import express from 'express';   // Framework para crear aplicaciones web y API
import bodyParser from 'body-parser';   // Middleware para analizar cuerpos de solicitud entrantes en un servidor Express
import cors from 'cors';   // Middleware para permitir solicitudes de recursos cruzados
import path from 'path';
import url from 'url';
import authRouter from './routes/script-server-login.js';
import crudRouter from './routes/script-server-crud.js';
import database from './models/connection.js';   // Conexión a la abse de datos importada desde el archivo en el qeu se crea la conexión a la base de datos

// Crea la aplicación Express
const server = express();

// Se define un puerto en el que el servidor escuchará las solicitudes
const port = 3000;

// Permite que las solicitudes de diferentes dominios sean aceptadas por el servidor
server.use(cors());

// Permite que el servidor entienda las solicitudes que tienen cuerpos en formato JSON
server.use(bodyParser.json());

// Obtener la ruta del directorio actual
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar Express para servir archivos estáticos
server.use(express.static(path.join(__dirname, 'public')));

// Método para iniciar la conexión a la base de datos. Si hay algún error, se imprimie un mensaje de error en la consola y se detiene la ejecución
database.connect((error) => {
    if (error)
    {
        console.error("Error al conectar a la base de datos:", error);
        return;
    }
    console.log("Conectado a la base de datos MySQL.");
});

// Rutas de la aplicación
server.use('/login', authRouter);
server.use('/crud', crudRouter);

// Inicia el servidor
server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});