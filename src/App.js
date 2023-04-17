import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AllRecetas from "./pages/AllRecetas";
import PrivatePage from "./components/PrivatePage.jsx";
import DetalleReceta from "./pages/DetalleReceta";
import Error from "./pages/Error"
import SearchBar from "./components/SearchBar";


function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Signup />}/>
        <Route path="/acceso" element={<Login />}/>
        <Route path="/recetas" element={<AllRecetas />}/>
        <Route path ="/error" element={<Error/>}/>
        <Route
          path="/recetas/:idReceta"
          element={
            <PrivatePage>
              <DetalleReceta />
            </PrivatePage>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
