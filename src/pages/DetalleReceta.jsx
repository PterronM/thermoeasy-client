import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { detailRecetaService, deleteRecetaService } from "../services/recetas.services";
import IsRecFavourite from "../components/IsRecFavourite";
// import { authContext } from "../context/auth.context";


function DetalleReceta() {
  const redirect = useNavigate();
  const params = useParams();
  const {idReceta} = params;
  // const { loggedUser } = useContext(authContext);


  const [receta, setReceta] = useState(null);
  const [userFavs, setUserFav] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await detailRecetaService(idReceta);
        console.log(response.data)
        setReceta(response.data[0]);
        setUserFav(response.data[1]);
        // if(loggedUser._id === response.data[0].autor._id){
        //   setIsOwner(true)
        // }
      } catch (error) {
        redirect("/error");
      }
    };
    getData();
  }, []);

  const deleteReceta = async () =>{
    try {
      await deleteRecetaService(idReceta);
      redirect(-1)
    } catch (error) {
      redirect("/error")
    }
  }

  return (
    <div>
      {!receta ? (
        <h3>Buscando</h3>
      ) : (
        <>
        <div>
          <div>
            <h3>{receta.titulo[0].toUpperCase() + receta.titulo.slice(1)}</h3>
          </div>
          <div>
            <p>{receta.autor.nombre}</p>
          </div>
          <div>
          <img src={receta.img} alt="receta" width={200} />
          </div>
            <p>{receta.preparacion}</p>          
            <h4>Receta para: {receta.nPersonas} personas</h4>
            <p>{new Date(receta.updatedAt).toLocaleDateString()}</p>
        </div>
        {isOwner ? (
          <>
        <Link to={`/receta/${idReceta}/editar`}>
          <button>Editar</button>
        </Link>
        <button onClick={deleteReceta}>Eliminar</button>
        </>
        ):(
          <div>
              <IsRecFavourite
                idReceta={idReceta}
                userFavs={userFavs.favoritos}
              />
            </div>
      )}
      </>
      )}
    </div>
  );
}

export default DetalleReceta;
