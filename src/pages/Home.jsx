import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { allRecetasService } from "../services/recetas.services";
import Receta from "../components/Receta";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";


function Home() {
  const redirect =  useNavigate();
  const [allRecetas, setAallRecetas] = useState(null);
  // const [isFeaching, setIsFeaching] = useState("")
  const [valueToSearch, setValueToSearch] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await allRecetasService();
        if ( valueToSearch) {
          const filteredAds = response.data
            .filter((each) => {
              return (
                each.titulo
                  .toLowerCase()
                  .includes(valueToSearch.toLowerCase()) ||
                each.autor.nombre
                  .toLowerCase()
                  .includes(valueToSearch.toLowerCase())
              );
            });
          setAallRecetas(filteredAds);
        } else {
          setAallRecetas(response.data);
        }
      } catch (error) {
        redirect("/error");
      }
    };
    getData();
  }, [valueToSearch]);

  return (
    <div>
       <SearchBar
        setValueToSearch = {setValueToSearch}
      />

    {!allRecetas ? (
      <div>
        <h3>Buscando</h3>
      </div>
    ): allRecetas.length === 0 ? (
      <h4>No hay recetas</h4>
    ): (
      <div>
      {allRecetas.map((each)=>(
     <Link to={`/recetas/${each._id}`} key ={each._id}>
        <Receta
          img = {each.img}
          titulo = {each.titulo}
          user  = {each.autor.nombre}
          nPersonas = {each.nPersonas}
          />
      </Link>
     ))}
      </div>     
    )}
    </div>
  )
}

export default Home;
