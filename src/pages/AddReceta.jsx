import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { newRecService } from "../services/recetas.services";

function AddReceta() {
  const redirect = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [preparacion, setPreparacion] = useState("");
  const [nPersonas, setNpersonas] = useState("");
  const [img, setImg] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const submitNewReceta = (e) => {
    e.prevent.default();
    const newRec = {
      titulo,
      ingredientes,
      preparacion,
      nPersonas,
      img,
    };

    const sendData = async () => {
      if (!titulo || !ingredientes || !preparacion || !nPersonas || !img) {
        setErrorMessage("Los campos deben estar rellenos");
        return;
      }
      try {
        const response = await newRecService(newRec);
        redirect(`/receta/${response.data._id}`);
      } catch (error) {
        redirect("/error")
      }
    };
    sendData();
  };

  return (
    <div>
      <div>
        <h3>Añade tu receta !</h3>
      </div>
      <div>
        <img src={setImg} alt="" />
      </div>
      <form>
        <label>Nombre de la receta</label>
        <input
          type="text"
          name="titulo"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <label>Ingredientes:</label>
        <input
          type="text"
          name="ingredientes"
          id="ingredientes"
          value={ingredientes}
          onChange={(e) => setIngredientes(e.target.value)}
        />

        <label>Preparacion</label>
        <input
          type="text"
          name="preparacion"
          id="preparacion"
          value={preparacion}
          onChange={(e) => setPreparacion(e.target.value)}
        />

        <label>¿Receta para cuantas personas?</label>
        <input
          type="number"
          name="nPersonas"
          id="nPersonas"
          value={nPersonas}
          onChange={(e) => setNpersonas(e.target.value)}
        />

        <div>
          <p>{errorMessage}</p>
        </div>

        <button onClick={submitNewReceta}>Crear Receta</button>
      </form>
    </div>
  );
}

export default AddReceta;
