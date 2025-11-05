import style from './Register.module.css';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import Button from '../../components/Button.tsx';
import LinkReturn from '../../components/LinkReturn.tsx';
import { supabase } from '../../lib/supabaseCliente.ts';

function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    // Cria o usuário no Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // Cria o registro do perfil
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: data.user.id,
          name,
          birth_date: date,
        },
      ]);

      if (profileError) {
        alert("Erro ao salvar o perfil: " + profileError.message);
        return;
      }
    }

    alert("Cadastro realizado com sucesso! Verifique seu e-mail para confirmar a conta.");
    setName("");
    setEmail("");
    setDate("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit} className={style.form}>
        <LinkReturn className={style.linkReturn} />
        <h1 className={style.title}>Cadastro</h1>

        <div className={style.inputBox}>
          <label>Nome Completo:</label>
          <input
            type="text"
            placeholder="Digite seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FaUser className={style.icon} />
        </div>

        <div className={style.inputBox}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MdEmail className={style.icon} />
        </div>

        <div className={style.inputBox}>
          <label>Data de Nascimento:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <IoCalendar className={style.icon} />
        </div>

        <div className={style.inputBox}>
          <label>Senha:</label>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className={style.icon} />
        </div>

        <div className={style.inputBox}>
          <label>Confirmação de Senha:</label>
          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <FaLock className={style.icon} />
        </div>

        <Button className={style.button} text="Cadastrar" />
      </form>
    </div>
  );
}

export default Register;
