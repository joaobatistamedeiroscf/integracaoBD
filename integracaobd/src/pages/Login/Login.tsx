import style from "./Login.module.css";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Button from "../../components/Button.tsx";


function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mensageEmail, setMensageEmail] = useState<string>("");
  const [mensagePassword, setMensagePassword] = useState<string>("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Email: " , email);
    console.log("Password: ", password);

    if(email === "" ){
      setMensageEmail("Por favor, preencha  o campo Email.");
    }
    if(password === ""){
      setMensagePassword("Por favor, preencha o campo Senha.");
    }

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

        {mensageEmail && <p className={style.mensagerror}>{mensageEmail}</p>}

        <div className={style.inputBox}>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className={style.icon} />
          </div>

          {mensagePassword && <p className={style.mensagerror}>{mensagePassword}</p>}

        <div className={style.forget}>
          <Link  className={style.link} to="/forget">Esqueceu a senha?</Link>
        </div>

        <Button className= {style.button} text="Entrar"  />
      
        
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
