import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { newRecService } from "../../services/recetas.services";
import { Form, FormGroup, Spinner } from "react-bootstrap";
import CloudinaryUploader from "../../components/CloudinaryUploader";

function AddReceta() {
  const redirect = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [preparacion, setPreparacion] = useState("");
  const [nPersonas, setNpersonas] = useState("");
  const [img, setImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const submitNewReceta = (e) => {
    e.prevent.default();
    const newRec = {
      titulo,
      ingredientes,
      preparacion,
      nPersonas,
      img:[],
    };

    const formData = new FormData();
    formData.append('img', e.target.files );
    Array.from(this.state.files).forEach((file) => {
      formData.append('file', file);
    });

    const sendData = async () => {
      if (!titulo || !ingredientes || !preparacion || !nPersonas) {
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
        <CloudinaryUploader
          setImg ={setImg}
          />
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
