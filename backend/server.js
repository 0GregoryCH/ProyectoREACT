// Importación de módulos necesarios
const express = require('express');      // Framework para crear el servidor web
const cors = require('cors');            // Middleware para habilitar CORS (Cross-Origin Resource Sharing)
const bodyParser = require('body-parser'); // Middleware para parsear el cuerpo de las peticiones HTTP

// Creación de la aplicación Express
const app = express();

// Configuración de middlewares
app.use(cors());                        // Habilita CORS para todas las rutas
app.use(bodyParser.json());             // Configura el parser para datos JSON en el body de las peticiones

// Configuración de rutas
app.use('/api/productos', require('./routes/productos'));  // Rutas para productos bajo el prefijo /api/productos
app.use('/api/ventas', require('./routes/ventas'));        // Rutas para ventas bajo el prefijo /api/ventas

// Inicio del servidor
app.listen(3001, () => console.log('Servidor backend en puerto 3001'));  // Escucha en el puerto 3001