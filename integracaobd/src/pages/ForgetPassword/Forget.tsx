import style from './Forget.module.css';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { FaUser } from "react-icons/fa";
import Button from '../../components/Button.tsx';
import LinkReturn from '../../components/LinkReturn.tsx';
import { supabase } from '../../lib/supabaseCliente.ts';

function Forget() {
  const [email, setEmail] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/update-password" // ajuste para sua rota real
    });

    if (error) {
      alert("Erro ao enviar e-mail: " + error.message);
      return;
    }

    alert("Um link de recuperação de senha foi enviado para o seu e-mail.");
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaUser className={style.icon} />
        </div>

        <Button className={style.button} text="Enviar" />
      </form>
    </div>
  );
}

export default Forget;
