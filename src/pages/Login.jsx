import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../services/auth.services";
import { authContext } from "../context/auth.context";

function Login() {
  const redirect = useNavigate();

  const { validateToken } = useContext(authContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      const response = await loginService(user);
      localStorage.setItem("authToken", response.data.authToken);
      validateToken();
      redirect("/recetas");
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
      <h2>Iniciar Sesión</h2>
      <div>
        <form>
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
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>{errorMessage !== "" && <h2>{errorMessage}</h2>}</div>
          <button onClick={handleLogin}>Entrar</button>
        </form>
      </div>
      <p>
        ¿No tiene cuenta?<Link to="/registro">Regístrate</Link>
      </p>
      <p><Link to="/">Ver Recetas</Link></p>
    </div>
  );
}

export default Login;
