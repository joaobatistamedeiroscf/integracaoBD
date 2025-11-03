import style from'./Forget.module.css' ;
import { useState } from 'react';
import type { FormEvent } from 'react';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Button from '../../components/Button.tsx';
import { GoArrowLeft } from "react-icons/go";
import { Link } from 'react-router-dom';

function Forget(){
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Email: " , email);
    console.log("Nova senha: ", password);
  }

  return (
    <div className={style.wrapper}>

      <form onSubmit={handleSubmit} className= {style.form}>
        
        <div className={style.containerReturn}>
          <GoArrowLeft className={style.iconReturn} />
          <Link className={style.linkReturn} to="/">Voltar</Link>
        </div>
        
        <h1 className = {style.title }>Recuperar Senha</h1>
        
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
            placeholder="Digite a nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            <FaLock className={style.icon} />
        </div>
        
        <Button className= {style.button} text="Enviar" />
        
        </form>
    </div>
  );
}
export default Forget ; 