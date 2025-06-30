// Importamos las librerías necesarias
import React, { useState, useEffect } from 'react'; // React y sus hooks básicos
import axios from 'axios'; // Librería para hacer peticiones HTTP

// Definimos el componente Ventas como una función
function Ventas() {
  /*
   * =============================================
   * DECLARACIÓN DE ESTADOS DEL COMPONENTE
   * =============================================
   * Usamos el hook useState para manejar el estado interno del componente
   * Cada estado almacena información crítica para el funcionamiento de la venta
   */
  
  // Lista de clientes disponibles (se carga desde la API)
  const [clientes, setClientes] = useState([]);
  
  // Lista de productos disponibles (se carga desde la API)
  const [productos, setProductos] = useState([]);
  
  // ID del cliente seleccionado para la venta
  const [clienteId, setClienteId] = useState('');
  
  // Array que contiene los productos agregados a la venta actual
  const [items, setItems] = useState([]);
  
  // ID del producto seleccionado para agregar a la venta
  const [productoId, setProductoId] = useState('');
  
  // Cantidad del producto seleccionado (valor por defecto 1)
  const [cantidad, setCantidad] = useState(1);

  /*
   * =============================================
   * EFECTO PARA CARGAR DATOS INICIALES
   * =============================================
   * useEffect se ejecuta (por el array de dependencias vacío)
   * Realiza peticiones HTTP para obtener clientes y productos disponibles
   */
  useEffect(() => {
    // Obtenemos la lista de clientes desde el backend
    axios.get('http://localhost:3001/api/ventas/clientes')
      .then(res => setClientes(res.data)) // Actualizamos el estado con los clientes recibidos
      .catch(err => console.error("Error cargando clientes:", err));
    
    // Obtenemos la lista de productos desde el backend
    axios.get('http://localhost:3001/api/ventas/productos')
      .then(res => setProductos(res.data)) // Actualizamos el estado con los productos recibidos
      .catch(err => console.error("Error cargando productos:", err));
  }, []); // Array vacío indica que solo se ejecute una vez al montar el componente

  /*
   * =============================================
   * FUNCIÓN PARA AGREGAR PRODUCTOS A LA VENTA
   * =============================================
   * Esta función se ejecuta cuando se hace clic en el botón "Agregar"
   * Busca el producto seleccionado y lo añade a la lista de items de la venta
   */
  const agregarProducto = () => {
    // Buscamos el producto en el array de productos usando el ID seleccionado
    const producto = productos.find(p => p.id === parseInt(productoId));
    
    // Validación: si no encontramos el producto, salimos de la función
    if (!producto) return;
    
    // Verificamos si el producto ya fue agregado a la venta
    const yaAgregado = items.find(i => i.id === producto.id);
    if (yaAgregado) {
      alert("Producto ya agregado");
      return; // Evitamos duplicados
    }
    
    // Actualizamos el estado de items añadiendo el nuevo producto
    setItems([...items, {
      id: producto.id, // ID del producto
      nombre: producto.nombre, // Nombre del producto
      precio_unit: parseFloat(producto.precio), // Precio unitario (convertido a float)
      cantidad: cantidad // Cantidad seleccionada
    }]);
    
    // Opcional: podríamos resetear los campos aquí
    // setProductoId('');
    // setCantidad(1);
  };

  /*
   * =============================================
   * FUNCIÓN PARA ELIMINAR ITEMS DE LA VENTA
   * =============================================
   * Elimina un producto de la lista de items de la venta
   * Recibe el ID del producto a eliminar
   */
  const eliminarItem = (id) => {
    // Filtramos el array de items, manteniendo solo los que no coincidan con el ID a eliminar
    setItems(items.filter(i => i.id !== id));
  };

  /*
   * =============================================
   * CÁLCULO DEL TOTAL DE LA VENTA
   * =============================================
   * Usamos reduce para sumar todos los subtotales (precio * cantidad)
   */
  const total = items.reduce((sum, i) => sum + i.precio_unit * i.cantidad, 0);

  /*
   * =============================================
   * FUNCIÓN PARA GUARDAR LA VENTA EN EL BACKEND
   * =============================================
   * Esta función se ejecuta al hacer clic en "Guardar Venta"
   * Valida los datos y envía la información al servidor
   */
  const guardarVenta = async () => {
    // Validaciones básicas antes de guardar
    if (!clienteId) {
      alert("Debe seleccionar un cliente");
      return;
    }
    
    if (items.length === 0) {
      alert("Debe agregar al menos un producto");
      return;
    }
    
    try {
      // Enviamos la venta al servidor mediante una petición POST
      await axios.post('http://localhost:3001/api/ventas', {
        cliente_id: clienteId, // ID del cliente
        productos: items // Array de productos vendidos
      });
      
      // Si todo sale bien, mostramos mensaje y reseteamos el formulario
      alert("Venta registrada con éxito");
      setClienteId(''); // Limpiamos cliente seleccionado
      setItems([]); // Vaciamos la lista de productos
      setProductoId(''); // Reseteamos producto seleccionado
      setCantidad(1); // Volvemos a cantidad por defecto
    } catch (error) {
      console.error("Error al guardar la venta:", error);
      alert("Ocurrió un error al guardar la venta");
    }
  };

  /*
   * =============================================
   * RENDERIZADO DEL COMPONENTE (INTERFAZ)
   * =============================================
   * Esta parte define lo que se muestra en pantalla
   */
  return (
    <div className="container mt-4">
      {/* Título de la sección */}
      <h2>Registrar Venta</h2>

      {/* 
       * SECCIÓN DE SELECCIÓN DE CLIENTE 
       * Dropdown para seleccionar el cliente de la venta
       */}
      <div className="mb-3">
        <label>Cliente</label>
        <select 
          className="form-control" 
          value={clienteId} 
          onChange={e => setClienteId(e.target.value)}
        >
          <option value="">Seleccione un cliente</option>
          {/* Mapeamos la lista de clientes para crear las opciones */}
          {clientes.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      {/* 
       * SECCIÓN DE SELECCIÓN DE PRODUCTOS 
       * Controles para seleccionar producto y cantidad
       */}
      <div className="mb-3 row">
        <div className="col">
          {/* Dropdown para seleccionar producto */}
          <select 
            className="form-control" 
            value={productoId} 
            onChange={e => setProductoId(e.target.value)}
          >
            <option value="">Seleccione producto</option>
            {/* Mapeamos la lista de productos para crear las opciones */}
            {productos.map(p => (
              <option key={p.id} value={p.id}>
                {p.nombre} - ${p.precio} {/* Mostramos nombre y precio */}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          {/* Input para seleccionar cantidad (número entero positivo) */}
          <input 
            type="number" 
            className="form-control" 
            value={cantidad} 
            onChange={e => setCantidad(parseInt(e.target.value) || 1)} 
            min="1" 
          />
        </div>
        <div className="col">
          {/* Botón para agregar el producto a la venta */}
          <button className="btn btn-success" onClick={agregarProducto}>
            Agregar
          </button>
        </div>
      </div>

      {/* 
       * TABLA DE PRODUCTOS AGREGADOS 
       * Muestra los productos en la venta actual con sus detalles
       */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapeamos los items de la venta para mostrarlos en filas */}
          {items.map(i => (
            <tr key={i.id}>
              <td>{i.nombre}</td>
              <td>${i.precio_unit.toFixed(2)}</td>
              <td>{i.cantidad}</td>
              <td>${(i.precio_unit * i.cantidad).toFixed(2)}</td>
              <td>
                {/* Botón para eliminar el producto de la venta */}
                <button 
                  className="btn btn-danger btn-sm" 
                  onClick={() => eliminarItem(i.id)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
          {/* Fila que muestra el total de la venta */}
          <tr>
            <td colSpan="3"><strong>Total</strong></td>
            <td colSpan="2"><strong>${total.toFixed(2)}</strong></td>
          </tr>
        </tbody>
      </table>

      {/* Botón para guardar la venta */}
      <button className="btn btn-primary" onClick={guardarVenta}>
        Guardar Venta
      </button>
    </div>
  );
}

// Exportamos el componente para poder usarlo en otros archivos
export default Ventas;