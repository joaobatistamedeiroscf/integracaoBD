import style from "./Login.module.css";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import Button from "../../components/Button.tsx";
import { supabase } from "../../lib/supabaseCliente.ts";
import { validateEmail } from "../../lib/validateEmail";
import { validatePassword } from "../../lib/validatePassword";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mensageEmail, setMensageEmail] = useState<string>("");
  const [mensagePassword, setMensagePassword] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const navigate = useNavigate();

  

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // limpa mensagens anteriores
    setMensageEmail("");
    setMensagePassword("");
    setSuccessMessage("");

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    if (emailErr) setMensageEmail(emailErr);
    if (passErr) setMensagePassword(passErr);

    if (emailErr || passErr) return; // não procede ao login se houver erros

    setSuccessMessage("Validações OK — efetuando login...");

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      // mostra mensagem de erro vinda do supabase e limpa success
      setSuccessMessage("");
      setMensagePassword("Erro ao fazer login: " + error.message);
      return;
    }

    setSuccessMessage("Login efetuado com sucesso! Redirecionando...");
    // um pequeno delay para que o usuário veja a mensagem
    setTimeout(() => navigate("/biblioteca"), 1000);
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
            onChange={(e) => {
              setEmail(e.target.value);
              setMensageEmail("");
              setSuccessMessage("");
            }}
          />
          <FaUser className={style.icon} />
        </div>
        {mensageEmail && <p className={style.mensagerrorEmail}>{mensageEmail}</p>}

        <div className={style.inputBox}>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setMensagePassword("");
              setSuccessMessage("");
            }}
          />
          <FaLock className={style.icon} />
        </div>
        
        {mensagePassword && <p className={style.mensagerrorPassword}>{mensagePassword}</p>}

        
        
        {successMessage && (
          <p className={style.mensagsuccess}>{successMessage}</p>
        )}



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
