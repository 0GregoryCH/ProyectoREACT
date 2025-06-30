// Importa el módulo mysql2 para interactuar con MySQL
const mysql = require('mysql2');

// Crea un objeto de conexión con las credenciales y configuración de la base de datos
const conn = mysql.createConnection({
    host: 'localhost',      // Servidor donde está alojada la BD (en este caso, local)
    user: 'root',           // Usuario para autenticarse en MySQL
    password: 'Admin',       // Contraseña del usuario
    database: 'TiendaBD'    // Nombre de la base de datos a la que se conectará
});

// Intenta establecer la conexión con el servidor MySQL
conn.connect(err => {
    if (err) throw err;     // Si hay error, lo lanza y detiene la ejecución
    console.log("MySQL conectado");  // Si es exitoso, muestra mensaje en consola
});

// Exporta el objeto de conexión para que pueda ser usado en otros módulos
module.exports = conn;