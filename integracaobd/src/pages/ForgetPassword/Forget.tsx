import style from "./Forget.module.css";
import { useState } from "react";
import type { FormEvent } from "react";
import { FaUser } from "react-icons/fa";
import Button from "../../components/Button/Button.tsx";
import LinkReturn from "../../components/LinkReturn/LinkReturn.tsx";
import { supabase } from "../../lib/supabaseCliente.ts";
import { validateEmail } from "../../lib/validateEmail";

function Forget() {
  const [email, setEmail] = useState<string>("");
  const [mensageEmail, setMensageEmail] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // limpar mensagens
    setMensageEmail("");
    setSuccessMessage("");

    const emailErr = validateEmail(email);
    if (emailErr) {
      setMensageEmail(emailErr);
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: "http://localhost:5173/update-password", // ajuste para sua rota real
    });

    if (error) {
      setSuccessMessage("");
      setMensageEmail("Erro ao enviar e-mail: " + error.message);
      return;
    }

    setSuccessMessage(
      "Um link de recuperação de senha foi enviado para o seu e-mail."
    );
    setEmail("");
  }

  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit} className={style.form}>
        <LinkReturn className={style.linkReturn} />
        <h1 className={style.title}>Recuperar Senha</h1>

        <div className={style.inputBox}>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMensageEmail("");
              setSuccessMessage("");
            }}
          />
          <FaUser className={style.icon} />
        </div>

        {mensageEmail && (
          <p className={style.mensagerrorEmail}>{mensageEmail}</p>
        )}

        {successMessage && (
          <p className={style.mensagsuccess}>{successMessage}</p>
        )}

        <Button className={style.button} text="Enviar" />
      </form>
    </div>
  );
}

export default Forget;
