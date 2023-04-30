import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { infoUser } from "../../services/user.services";
import { authContext } from "../../context/auth.context";
import { PropagateLoader } from "react-spinners";

function PerfilUser() {
  const {validateToken, loggedUser} = useContext(authContext)

  const params = useParams();
  const redirect = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await infoUser(params.idUser);
        setUserInfo(response.data)
      } catch (error) {
        redirect("/error");
      }
    };
    getData();
  }, []);

  const handleLogout = ()=>{
    localStorage.removeItem("authToken")
    validateToken();
    redirect("/")
  }



  return (
    <div >
    <div >
      {!userInfo ? (
        <div >
          <h3>Buscando</h3>
          <PropagateLoader />
        </div>
      ) : (
        <>
          <div>
            <img
              src={userInfo.imgPerfil}
              alt="profile img"
              width="100px"
            />
          </div>
          <div >
            <div>
              <span>Nombre de usuario: </span>
              <h3>{userInfo.nombre}</h3>
            </div>
            <div>
              <span>Email: </span>
              <h4>{userInfo.email}</h4>
            </div>
          </div>
          <div>
            <Link to={"/recetas/misRecetas"}>
              <button>Mis anuncios</button>
            </Link>
            <Link to={`/perfil/${loggedUser._id}/editar`}>
              <button >Editar Perfil</button>
            </Link>
            <button onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </>
      )}
    </div>
  </div>
);
}
export default PerfilUser;
