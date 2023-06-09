import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/auth.context.js";
//!tood AÑADIR IMAGINES PARA VISTA MOVIL
// import homeIcon from "../assets/images/home-icon.png";


function Navbar() {
  const {loggedUser, isLoggedIn} = useContext(authContext);

  if (isLoggedIn) {
    return (
      <div className="navBar">
        <div className="mobile-navBar">

          <NavLink to="/recetas/favoritos"></NavLink>
          <NavLink to={`/perfil/${loggedUser._id}`}></NavLink>
        </div>
        <div className="web-navBar">
            <NavLink to="/recetas/misRecetas">Mis Recetas</NavLink>
            <NavLink to="/recetas/favoritos">Favoritos</NavLink>
            <NavLink to="/recetas/añadir">Añadir Receta</NavLink>
            <NavLink to="/">Todas las recetas</NavLink>
            <NavLink to={`/perfil/${loggedUser._id}`}>Perfil</NavLink>
        </div>
      </div>
    );
  } else {
    return (
      <div className="notLogin-navBar">
        <NavLink to="/registro">Registro</NavLink>
        <NavLink to="/acceso">Acceso</NavLink>
      </div>
    );
  }
}

export default Navbar;

// function Navbar() {
//   return (
//     <div className="">
//       <p>Navbar</p>
//     </div>
//   )
// }

// export default Navbar
