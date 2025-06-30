const express = require('express');
const router = express.Router();
const db = require('../db');  // Importa la conexión a la base de datos

// Endpoint: GET /clientes - Obtiene todos los clientes
router.get('/clientes', (req, res) => {
    db.query("SELECT * FROM clientes", (err, results) => {
        if (err) throw err;  // Manejo básico de errores
        res.json(results);    // Devuelve la lista de clientes en formato JSON
    });
});

// Endpoint: GET /productos - Obtiene todos los productos
router.get('/productos', (req, res) => {
    db.query("SELECT * FROM productos", (err, results) => {
        if (err) throw err;
        res.json(results);  // Devuelve la lista de productos en formato JSON
    });
});

// Endpoint: POST / - Registra una nueva venta
router.post('/', (req, res) => {
    const { cliente_id, productos } = req.body;  // Extrae datos del cuerpo de la petición

    // 1. Primero inserta la venta principal
    db.query(
        "INSERT INTO ventas (cliente_id) VALUES (?)", 
        [cliente_id], 
        (err, result) => {
            if (err) throw err;

            const venta_id = result.insertId;  // Obtiene el ID de la venta recién creada

            // 2. Prepara los detalles de la venta (productos vendidos)
            const detalles = productos.map(p => [
                venta_id,          // ID de la venta
                p.id,               // ID del producto
                p.cantidad,         // Cantidad vendida
                p.precio_unit,     // Precio unitario
                p.cantidad * p.precio_unit  // Subtotal (calculado)
            ]);

            // 3. Inserta todos los detalles de la venta en una sola operación
            db.query(
                "INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio_unit, subtotal) VALUES ?",
                [detalles],  // Nota: el ? aquí es para el lote de valores
                (err) => {
                    if (err) throw err;
                    res.json({ 
                        mensaje: "Venta registrada", 
                        venta_id  // Devuelve el ID de la venta creada
                    });
                }
            );
        }
    );
});

module.exports = router;  // Exporta el router para su uso en otros archivos