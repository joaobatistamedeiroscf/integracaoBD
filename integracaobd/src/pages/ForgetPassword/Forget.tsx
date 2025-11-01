import style from'./Forget.module.css' ;
import { useState } from 'react';
import type { FormEvent } from 'react';

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

      <form onSubmit={handleSubmit}>
        
        <h1>Recuperar Senha</h1>
        
        <div className={style.inputBox}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={style.inputBox}>
          <input
            type="password"
            placeholder="Digite a nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Enviar</button>
        
        </form>
    </div>
  );
}
export default Forget ; 