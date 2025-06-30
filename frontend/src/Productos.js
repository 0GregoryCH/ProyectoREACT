//////
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Productos() {
  // Estados del componente
  const [productos, setProductos] = useState([]); // Almacena la lista de productos
  const [form, setForm] = useState({ // Controla el formulario de producto
    nombre: '', 
    descripcion: '', 
    precio: '', 
    stock: '' 
  });
  const [productoEditando, setProductoEditando] = useState(null); // Producto en edición

  // Efecto para cargar productos al montar el componente
  useEffect(() => {
    cargarProductos();
  }, []);

  // Función para obtener productos desde la API
  const cargarProductos = async () => {
    const res = await axios.get('http://localhost:3001/api/productos');
    setProductos(res.data);
  };

  // Función para guardar (crear o actualizar) un producto
  const guardarProducto = async () => {
    if (productoEditando) {
      // Actualización de producto existente
      await axios.put(`http://localhost:3001/api/productos/${productoEditando.id}`, form);
      setProductoEditando(null);
    } else {
      // Creación de nuevo producto
      await axios.post('http://localhost:3001/api/productos', form);
    }
    // Limpiar formulario y recargar lista
    setForm({ nombre: '', descripcion: '', precio: '', stock: '' });
    cargarProductos();
  };

  // Función para eliminar un producto
  const eliminarProducto = async (id) => {
    await axios.delete(`http://localhost:3001/api/productos/${id}`);
    cargarProductos();
  };

  // Función para preparar la edición de un producto
  const editarProducto = (producto) => {
    setProductoEditando(producto);
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock
    });
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Productos</h2>

      {/* Formulario de producto */}
      <div className="mb-3">
        <input type="text" placeholder="Nombre" className="form-control mb-2"
          value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
        <input type="text" placeholder="Descripción" className="form-control mb-2"
          value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} />
        <input type="number" placeholder="Precio" className="form-control mb-2"
          value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} />
        <input type="number" placeholder="Stock" className="form-control mb-2"
          value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
        
        {/* Botón dinámico (Guardar/Actualizar) */}
        <button className="btn btn-primary" onClick={guardarProducto}>
          {productoEditando ? 'Guardar cambios' : 'Guardar'}
        </button>
        
        {/* Botón para cancelar edición (solo visible en modo edición) */}
        {productoEditando && (
          <button className="btn btn-secondary ms-2" onClick={() => {
            setProductoEditando(null);
            setForm({ nombre: '', descripcion: '', precio: '', stock: '' });
          }}>
            Cancelar edición
          </button>
        )}
      </div>

      {/* Tabla de productos */}
      <table className="table table-bordered">
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>{p.precio}</td>
              <td>{p.stock}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editarProducto(p)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => eliminarProducto(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Productos;