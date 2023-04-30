import { useContext, useEffect, useState } from "react";
import { Link, useFetcher, useNavigate } from "react-router-dom";
import { authContext } from "../../context/auth.context";
import { editPerfilUserService } from "../../services/user.services";
import { uploadImageService } from "../../services/upload.services";
import { updateUserProfileService } from "../../services/profile.services";
import { PropagateLoader } from "react-spinners";

function EditPerfilUser() {
    const {loggedUser} = useContext(authContext)
    const redirect = useNavigate()

    const [nombre, setNombre] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [email, setEmail] = useState("");
    const [imgPerfil, setImgPerfil] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    useEffect(()=>{
        const getData = async ()=>{
            try {
                const response = await editPerfilUserService(loggedUser._id)
                setNombre(response.data.nombre)
                setEmail(response.data.email)
                setImgPerfil(response.data.imgPerfil)
            } catch (error) {
                redirect("/error")
            }
        }
        getData()
    },[])

    const handleFileUpload = async (e) => {
        if (!e.target.files[0]) {
          return;
        }
        setIsUploading(true);
    
        const uploadData = new FormData();
        uploadData.append("image", e.target.files[0]);
        try {
          const response = await uploadImageService(uploadData);
          setImgPerfil(response.data.imageUrl);
          setIsUploading(false);
        } catch (error) {
          redirect("/error");
        }
      };

      const editProfile = async (e) => {
        e.preventDefault();
    
        const updatedProfile = {
          nombre,
          password,
          passwordVerify,
          email,
          imgPerfil,
        };
        try {
          await updateUserProfileService(loggedUser._id, updatedProfile);
          redirect(`/perfil/${loggedUser._id}`);
        } catch (error) {
          if (error.response.status === 400) {
            setErrorMessage(error.response.data.errorMessage);
          } else {
            redirect("/error");
          }
        }
      };


  return (
    <div className="editProfile-body">
    
    <div className="editProfile-container">
      {imgPerfil && (
        <div className="editProfile-imgContainer">
          <img src={imgPerfil} alt="img" width={200} />
        </div>
      )}
      {isUploading && <PropagateLoader />}
      <div className="uploadImg-container">
      <label htmlFor="image">Cambiar imagen</label>
      <input
        type="file"
        name="image"
        id="image"
        className="inputfile"
        onChange={handleFileUpload}
        disabled={isUploading}
      />
      </div>
    </div>
    <form className="editProfile-form">
      <div className="editProfile-div">
        <label htmlFor="username">Nombre Usuario:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña Actual:</label>
        <input 
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
           />
      </div>
      <div>
        <label htmlFor="passwordVerify">Repeta la contraseña:</label>
        <input 
          type="password"
          name="passwordVerify"
          id="passwordVerify"
          value={passwordVerify}
          onChange={(e)=>setPasswordVerify(e.target.value)}
           />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input 
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}    
         />
      </div>
      <div>{errorMessage !== "" && <h2>{errorMessage}</h2>}</div>
      <button className="btn" onClick={editProfile}>Editar</button>
    </form>
    <Link to={`/perfil/${loggedUser._id}/borrarCuenta`}>
      <button className="btn">Borrar cuenta</button>
    </Link>
  </div>
);
}

export default EditPerfilUser;