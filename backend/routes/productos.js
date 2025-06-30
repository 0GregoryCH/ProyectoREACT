// Importación de dependencias
const express = require('express');  // Framework web
const router = express.Router();     // Creación de un enrutador para manejar rutas
const db = require('../db');         // Conexión a la base de datos

// Ruta GET para obtener todos los productos
router.get('/', (req, res) => {
    // Consulta SQL para seleccionar todos los productos
    db.query("SELECT * FROM productos", (err, results) => {
        if (err) throw err;  // Manejo básico de errores
        res.json(results);    // Devuelve los resultados en formato JSON
    });
});

// Ruta POST para crear un nuevo producto
router.post('/', (req, res) => {
    // Extrae los datos del cuerpo de la petición
    const { nombre, descripcion, precio, stock } = req.body;
    
    // Consulta SQL para insertar un nuevo producto
    db.query("INSERT INTO productos SET ?", 
        { nombre, descripcion, precio, stock }, 
        (err, result) => {
            if (err) throw err;
            // Devuelve el nuevo producto creado con su ID
            res.json({ id: result.insertId, nombre, descripcion, precio, stock });
        });
});

// Ruta PUT para actualizar un producto existente
router.put('/:id', (req, res) => {
    const { id } = req.params;  // Obtiene el ID de los parámetros de la URL
    // Extrae los nuevos datos del cuerpo de la petición
    const { nombre, descripcion, precio, stock } = req.body;
    
    // Consulta SQL para actualizar el producto
    db.query("UPDATE productos SET ? WHERE id = ?", 
        [{ nombre, descripcion, precio, stock }, id], 
        (err) => {
            if (err) throw err;
            res.sendStatus(200);  // Respuesta exitosa sin contenido
        });
});

// Ruta DELETE para eliminar un producto
router.delete('/:id', (req, res) => {
    // Consulta SQL para eliminar un producto por ID
    db.query("DELETE FROM productos WHERE id = ?", 
        [req.params.id], 
        err => {
            if (err) throw err;
            res.sendStatus(200);  // Respuesta exitosa sin contenido
        });
});

// Exporta el router para ser usado en otros archivos
module.exports = router;