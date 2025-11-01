import style from "./Login.module.css";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";



function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Email: " , email);
    console.log("Password: ", password);
  }

  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className={style.inputBox}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={style.inputBox}>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={style.forget}>
          <Link to="/forget">Esqueceu a senha?</Link>
        </div>

        <button type="submit">Entrar</button>

      
        
        <div className={style.register}>
          <p>
            Não tem uma conta? <Link to="/register">Cadastre-se</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
