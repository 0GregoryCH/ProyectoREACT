/*
 * =============================================
 * IMPORTACIONES NECESARIAS
 * =============================================
 * Importamos las librerías y componentes requeridos
 */
import React from 'react'; // Biblioteca principal de React
import { Link } from 'react-router-dom'; // Componente para navegación interna en la aplicación

/*
 * =============================================
 * COMPONENTE FUNCIONAL NAVBAR
 * =============================================
 * Este componente representa la barra de navegación superior de la aplicación
 * Proporciona enlaces a las diferentes secciones de la aplicación
 */
function Navbar() {
  /*
   * =============================================
   * RETURN (LO QUE SE RENDERIZA EN PANTALLA)
   * =============================================
   * Define la estructura y apariencia de la barra de navegación
   */
  return (
    /*
     * Elemento <nav> que representa la barra de navegación
     * Utiliza estilos en línea para definir su apariencia:
     * - padding: Espaciado interno de 10px en todos los lados
     * - background: Color de fondo azul (#007bff, el color primary de Bootstrap)
     * - color: Color del texto blanco
     */
    <nav style={{
      padding: '10px',          // Espaciado interno de 10 píxeles
      background: '#007bff',     // Color de fondo azul (código hexadecimal)
      color: 'white'            // Color del texto en blanco
    }}>
      {/*
       * =============================================
       * ENLACE A LA PÁGINA DE PRODUCTOS
       * =============================================
       * Componente Link de react-router-dom que permite navegar sin recargar la página
       * to="/productos": Define la ruta a la que lleva este enlace
       * style: Objeto con estilos en línea para este enlace específico
       */}
      {/* Enlace a la página de productos */}
      <Link 
        to="/productos"  // Ruta hacia la página de productos
        style={{
          marginRight: '20px',      // Margen derecho de 20px para separar este enlace del siguiente
          color: 'white',           // Color del texto en blanco
          textDecoration: 'none'    // Elimina el subrayado predeterminado de los enlaces
        }}>
        Productos  {/* Texto que se muestra para este enlace*/}
      </Link>
      
      {/*
       * =============================================
       * ENLACE A LA PÁGINA DE VENTAS
       * =============================================
       * Similar al anterior pero apunta a la ruta de ventas
       */}
      {/* Enlace a la página de ventas */}
      <Link 
        to="/ventas"     // Ruta hacia la página de ventas
        style={{
          color: 'white',           // Color del texto en blanco
          textDecoration: 'none'    // Elimina el subrayado predeterminado de los enlaces
        }}>
        Ventas  {/* Texto que se muestra para este enlace*/}
      </Link>
    </nav>
  );
}

/*
 * =============================================
 * EXPORTACIÓN DEL COMPONENTE
 * =============================================
 * Hacemos disponible este componente para ser importado y usado en otros archivos
 */
export default Navbar;