import style from "./Register.module.css";
import { useState } from "react";
import type { FormEvent } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import Button from "../../components/Button.tsx";
import LinkReturn from "../../components/LinkReturn.tsx";
import { supabase } from "../../lib/supabaseCliente.ts";
import { validateEmail } from "../../lib/validateEmail";
import { validatePassword } from "../../lib/validatePassword";
import { validateName } from "../../lib/validateName";
import { validateDate } from "../../lib/validateDate";

function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [mensageName, setMensageName] = useState<string>("");
  const [mensageEmail, setMensageEmail] = useState<string>("");
  const [mensagePassword, setMensagePassword] = useState<string>("");
  const [mensageConfirmPassword, setMensageConfirmPassword] =
    useState<string>("");
  const [mensageDate, setMensageDate] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // limpar mensagens anteriores
    setMensageName("");
    setMensageEmail("");
    setMensagePassword("");
    setMensageConfirmPassword("");
    setSuccessMessage("");

    // validações usando a mesma estrutura do Login (chamar validador -> set mensagem -> parar se erro)
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const dateErr = validateDate(date);
    const passErr = validatePassword(password);
    const confirmPassErr = validatePassword(confirmPassword);

    if (nameErr) {
      setMensageName(nameErr);
    }
    if (emailErr) {
      setMensageEmail(emailErr);
    }
    if (dateErr) {
      setMensageDate(dateErr);
    }
    if (passErr) {
      setMensagePassword(passErr);
    }
    if (confirmPassErr) {
      setMensageConfirmPassword(confirmPassErr);
    }

    // checa se senhas batem (após validar regras de senha)
    if (!passErr && !confirmPassErr && password !== confirmPassword) {
      setMensageConfirmPassword("As senhas não coincidem.");
    }

    // se houver qualquer mensagem de erro, não prossegue (mesma lógica do Login)
    if (
      nameErr ||
      emailErr ||
      dateErr ||
      passErr ||
      confirmPassErr ||
      password !== confirmPassword
    ) {
      return;
    }

    setSuccessMessage("Validações OK — cadastrando usuário...");

    // Cria o usuário no Supabase
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    if (error) {
      // limpa success e mostra mensagem personalizada
      setSuccessMessage("");
      setMensagePassword("Erro ao cadastrar: " + error.message);
      return;
    }

    // Cria o registro do perfil
    if (data?.user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: data.user.id,
          name,
          birth_date: date || null,
        },
      ]);

      if (profileError) {
        setSuccessMessage("");
        setMensagePassword("Erro ao salvar o perfil: " + profileError.message);
        return;
      }
    }

    setSuccessMessage(
      "Cadastro realizado com sucesso! Verifique seu e-mail para confirmar a conta."
    );
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
            onChange={(e) => {
              setName(e.target.value);
              setMensageName("");
              setSuccessMessage("");
            }}
          />
          <FaUser className={style.icon} />
        </div>
        {mensageName && <p className={style.mensagerrorName}>{mensageName}</p>}

        <div className={style.inputBox}>
          <label>Email:</label>
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
          <MdEmail className={style.icon} />
        </div>
        {mensageEmail && (
          <p className={style.mensagerrorEmail}>{mensageEmail}</p>
        )}

        <div className={style.inputBox}>
          <label>Data de Nascimento:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setMensageDate("");
              setSuccessMessage("");
            }}
          />
          <IoCalendar className={style.icon} />
        </div>
        {mensageDate && <p className={style.mensagerrorEmail}>{mensageDate}</p>}

        <div className={style.inputBox}>
          <label>Senha:</label>
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
        {mensagePassword && (
          <p className={style.mensagerrorPassword}>{mensagePassword}</p>
        )}

        <div className={style.inputBox}>
          <label>Confirmação de Senha:</label>
          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setMensageConfirmPassword("");
              setSuccessMessage("");
            }}
          />
          <FaLock className={style.icon} />
        </div>
        {mensageConfirmPassword && (
          <p className={style.mensagerrorPassword}>{mensageConfirmPassword}</p>
        )}

        {successMessage && (
          <p className={style.mensagsuccess}>{successMessage}</p>
        )}
        <Button className={style.button} text="Cadastrar" />
      </form>
    </div>
  );
}

export default Register;
