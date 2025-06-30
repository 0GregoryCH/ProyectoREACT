// Importaciones de React y componentes necesarios
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Componentes de enrutamiento
import Navbar from './Navbar'; // Componente de barra de navegación
import Productos from './Productos'; // Componente de gestión de productos
import Ventas from './Ventas'; // Componente de gestión de ventas

// Componente principal de la aplicación
function App() {
  return (
    // Configura el enrutador principal
    <Router>
      {/* Muestra la barra de navegación en todas las páginas */}
      <Navbar />
      
      {/* Contenedor principal con margen superior */}
      <div className="container mt-4">
        {/* Sistema de rutas */}
        <Routes>
          {/* Ruta para la página de productos */}
          <Route path="/productos" element={<Productos />} />
          
          {/* Ruta para la página de ventas */}
          <Route path="/ventas" element={<Ventas />} />
          
          {/* Ruta comodín para cualquier otra dirección */}
          <Route path="*" element={<h2>Bienvenido a la app</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;