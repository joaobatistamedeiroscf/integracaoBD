import style from'./Register.module.css' ;
import { useState } from 'react';
import type { FormEvent } from 'react';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import Button from '../../components/Button.tsx';
import LinkReturn from '../../components/LinkReturn.tsx';




function Register(){
    
    const [name , setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Nome: " , name);
    console.log("Data de Nascimento: " , date);
    console.log("Email: " , email);
    console.log("Senha: ", password);
    console.log("Confirmação de Senha: ", confirmPassword);
  }

  return (
    
    <div className={style.wrapper}>

      <form onSubmit={handleSubmit} className={style.form}>
         
          <LinkReturn className={style.linkReturn} />
          
          <h1 className= {style.title}>Cadastro</h1>
        
        <div className={style.inputBox}>
            <label htmlFor="">Nome Completo:</label>
          <input
            type="text"
            placeholder="Digite seu nome completo:"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FaUser className={style.icon} />
        </div>

        <div className={style.inputBox}>
            <label>Email:</label>
          <input
            type="email"
            placeholder="Digite seu email:"
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
          <FaLock  className={style.icon} />
        </div>

    <Button className= {style.button} text="Cadastrar" />

      </form>
    </div>
  );
}

export default Register ;