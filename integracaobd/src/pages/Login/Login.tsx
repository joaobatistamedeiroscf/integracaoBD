import style from "./Login.module.css";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";


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
      <form  className={style.form} onSubmit={handleSubmit}>
        <h1 className={style.title}>Login</h1>
        
        <div className={style.inputBox}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaUser className={style.icon} />
        </div>
        
        <div className={style.inputBox}>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className={style.icon} />
          
        </div>
        <div className={style.forget}>
          <Link  className={style.link} to="/forget">Esqueceu a senha?</Link>
        </div>

        <button className={style.button} type="submit">Entrar</button>

      
        
        <div className={style.register}>
          <p>
            Não tem uma conta? <Link className={style.link} to="/register">Cadastre-se</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
