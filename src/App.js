import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivatePage from "./components/PrivatePage.jsx";
import DetalleReceta from "./pages/Recetas/DetalleReceta";
import Error from "./pages/Error";
import AddReceta from "./pages/Recetas/AddReceta";
import MisRecetas from "./pages/Recetas/MisRecetas";
import Favoritos from "./pages/User/Favoritos";
import EditRec from "./pages/Recetas/EditRec";
import PerfilUser from "./pages/User/PerfilUser";
import EditPerfilUser from "./pages/User/EditPerfilUser";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Signup />} />
        <Route path="/acceso" element={<Login />} />

        <Route
          path="/recetas/misrecetas"
          element={
            <PrivatePage>
              <MisRecetas />
            </PrivatePage>
          }
        />

        <Route
          path="/recetas/:idReceta"
          element={
            <PrivatePage>
              <DetalleReceta />
            </PrivatePage>
          }
        ></Route>

        <Route
          path="/recetas/añadir"
          element={
            <PrivatePage>
              <AddReceta />
            </PrivatePage>
          }
        ></Route>

        <Route
          path="/recetas/:idReceta/editar"
          element={
            // <PrivatePage>
            <EditRec />
            // </PrivatePage>
          }
        />

        <Route
          path="/recetas/favoritos"
          element={
            <PrivatePage>
              <Favoritos />
            </PrivatePage>
          }
        ></Route>

        <Route
          path="/perfil/:idUser"
          element={
            <PrivatePage>
              <PerfilUser />
            </PrivatePage>
          }
        />
        <Route
          path="/perfil/:idUser/editar"
          element={
            <PrivatePage>
              <EditPerfilUser />
            </PrivatePage>
          }
        />

        <Route
          path="/perfil/:idUser/eliminarCuenta"
          element={
            <PrivatePage>
              <eliminarCuenta/>
            </PrivatePage>

          }
        />

        <Route path="/error" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
