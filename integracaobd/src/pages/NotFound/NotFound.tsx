import style from './NotFound.module.css';
import { TiAnchor } from "react-icons/ti";

function NotFound(){
    return(
        <div className = {style.wrapper}>
            <div className={style.container}>
                 <h1 className = {style.title}>Ops... Página não encontrada!​</h1>
                 <TiAnchor className = {style.icon} />
            </div>
           
            
        </div>
    )


}

export default NotFound;