import style from "./Login.module.css";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import Button from "../../components/Button.tsx";
import { supabase } from "../../lib/supabaseCliente.ts";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) {
      alert("Preencha todos os campos.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Erro ao fazer login: " + error.message);
      return;
    }

    navigate("/biblioteca"); // redireciona após login
  }

  return (
    <div className={style.wrapper}>
      <form className={style.form} onSubmit={handleSubmit}>
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
          <Link className={style.link} to="/forget">Esqueceu a senha?</Link>
        </div>

        <Button className={style.button} text="Entrar" />

        <div className={style.register}>
          <p>
            Não tem uma conta?{" "}
            <Link className={style.link} to="/register">Cadastre-se</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
