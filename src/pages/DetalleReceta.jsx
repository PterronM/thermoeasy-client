import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { detailRecetaService, deleteRecetaService } from "../services/recetas.services";
import IsRecFavourite from "../components/IsRecFavourite";
import { Image } from 'cloudinary-react';
import { authContext } from "../context/auth.context";
import ModalDeleteRec from "./Modals/ModalDeleteRec";


function DetalleReceta() {
  const redirect = useNavigate();
  const params = useParams();
  const {idReceta} = params;
  const { loggedUser } = useContext(authContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(!show);

  const [receta, setReceta] = useState(null);
  const [userFavs, setUserFav] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await detailRecetaService(idReceta);
        console.log(response.data[0])
        setReceta(response.data[0]);
        setUserFav(response.data[1]);
        if(loggedUser._id === response.data[0].autor._id){
          setIsOwner(true)
        }
      } catch (error) {
        redirect("/error");
      }
    };
    getData();
  }, []);

  const deleteReceta = async () =>{
    try {
      handleClose();
      await deleteRecetaService(idReceta);
      // redirect(-1)
      redirect("/")
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
            {receta.img.map((image,index)=>(
              <img key={index} src={image} alt={index} width={200} height={150}
              />
            ))}
          </div>
            <div>
              {receta.ingredientes.map((ing,index) => (
                <ul key={index}>
                  <li>{ing}</li>
                </ul>
              ))}
            </div>
            <p>{receta.preparacion}</p>          
            <h4>Receta para: {receta.nPersonas} personas</h4>
            <p>{receta.autor.nombre}</p>
            <p>{new Date(receta.updatedAt).toLocaleDateString()}</p>
        </div>
        {isOwner ? (
          <>
        <Link to={`/recetas/${idReceta}/editar`}>
          <button>Editar</button>
        </Link>

        <button onClick={handleClose}>Eliminar</button>
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
      <ModalDeleteRec
        show={show}
        handleClose={handleClose}
        eliminar = {deleteReceta}
      />
    </div>
   
  );
}

export default DetalleReceta;
