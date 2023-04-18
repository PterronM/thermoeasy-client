import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupService } from "../services/auth.services";

function Signup() {
  const redirect = useNavigate();
  const [nombre, setnombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      nombre,
      email,
      password,
      passwordVerify,
    };
    try {
      await signupService(newUser);
      redirect("/acceso");
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        redirect("/error");
      }
    }
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="nombre">Nombre de usuario</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setnombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="verifyPassword">Repetir contraseña</label>
          <input
            type="password"
            id="verifyPassword"
            name="verifyPassword"
            value={passwordVerify}
            onChange={(e) => setPasswordVerify(e.target.value)}
          />
        </div>
        <div>{errorMessage !== "" && <h2>{errorMessage}</h2>}</div>
        <button onClick={handleSubmit}>Registrarse</button>
      </form>
      <p>¿Ya esta registrado?<Link to="/acceso">Acceder</Link></p>
      <Link to="/"><button> Ver recetas</button></Link>
    </div>
  );
}

export default Signup;
