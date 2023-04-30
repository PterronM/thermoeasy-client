import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { detailRecetaService, editRecService } from "../../services/recetas.services";

function EditRec() {
 
  const params = useParams();
  const { idReceta } = params;
  const redirect = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [preparacion, setPreparacion] = useState("");
  const [nPersonas, setNpersonas] = useState("");
  const [img, setImg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await detailRecetaService(idReceta);
        setTitulo(response.data[0].titulo);
        setIngredientes(response.data[0].ingredientes);
        setPreparacion(response.data[0].preparacion);
        setImg(response.data[0].img[0]);
        // setUserImages(response.data[0].adImages);
      } catch (error) {
        redirect("/error");
      }
    };
    getData();
  }, []);

  const updateRec = async (e) => {
    e.preventDefault();
    const updatedRec = {
      titulo,
      preparacion,
      nPersonas,
      ingredientes,
      img,
    };
    try {
      if (!titulo || !preparacion || !nPersonas || !ingredientes) {
        setErrorMessage(
          'Los campos "Titulo", "preparacion" , Nº de personas e "ingredientes" deben estar rellenos para poder actulizar la receta'
        );
        return;
      }
      await editRecService(idReceta, updatedRec);
      console.log(idReceta)
      redirect(`/recetas/${idReceta}`);
    } catch (error) {
      redirect("/error");
    }
  };

  return (
    <div>
      <p>Editar receta</p>
      <div>
        <form onSubmit={updateRec}>
        {/* <form> */}
        {/* <div>
          <label htmlFor="img">Imagenes</label>
          <input ç
            type="text"
            name="img"
            id="img"
            value={img}
            onChange={(e) => setImg(e.target.value)}
             />
        </div> */}
          <div>
            <label htmlFor="titulo">Nombre de la Receta</label>
            <input
              type="text"
              name="titulo"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="preparacion">Preparación</label>
            <input
              type="text"
              name="preparacion"
              id="preparacion"
              value={preparacion}
              onChange={(e) => setPreparacion(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="nPersonas">Nº de comensales</label>
            <input
              type="number"
              name="nPersonas"
              id="nPersonas"
              value={nPersonas}
              onChange={(e) => setNpersonas(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ingredientes">Ingredientes</label>
            <input
              type="text"
              name="ingredientes"
              id="ingredientes"
              value={ingredientes}
              onChange={(e) => setIngredientes(e.target.value)}
            />
          </div>
          <div>
            <p>{errorMessage}</p>
          </div>
          <div>
            <button>Editar Receta</button>
          </div>
        </form>
      </div>
    </div>
  );
  }

export default EditRec;
