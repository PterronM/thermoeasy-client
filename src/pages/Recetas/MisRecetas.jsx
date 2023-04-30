import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { recetasUser } from "../../services/recetas.services";
import Receta from "../../components/Receta";

function MisRecetas() {
  const redirect = useNavigate();

  const [misRec, setMisRec] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await recetasUser();
        // console.log(response.data);
        setMisRec(response.data);
      } catch (error) {
        redirect("/error");
      }
    };
    getData();
  }, []);

  return (
    <div>
      {!misRec ? (
        <h3>Buscando</h3>
      ) : (
        <>
          <div>
            {misRec.map((each) => (
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

export default MisRecetas;
