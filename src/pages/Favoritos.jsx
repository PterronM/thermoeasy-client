import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { recetasFavUserService } from "../services/recetas.services";
import Receta from "../components/Receta";

function Favoritos() {
  const redirect = useNavigate();

  const [recFavUser, setRecFavUser] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await recetasFavUserService();
        const filterRec = response.data
        .filter((each)=>{
            return(
                each.titulo.toLowerCase()
            )
        })        
        setRecFavUser(filterRec);
      } catch (error) {
        redirect("/error");
      }
    };
    getData();
  }, []);

  return (
    <div>
      {!recFavUser ? (
        <h3>Buscando</h3>
      ) : (
        <>
          <div>
            {recFavUser.map((each) => (
              <Link to={`/recetas/${each._id}`} key={each._id}>
                <Receta
                  img={each.img}
                  titulo={each.titulo}
                  user={each.autor.nombre}
                  nPersonas={each.nPersonas}
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Favoritos;
