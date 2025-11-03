import style from './NotFound.module.css';
import { TiAnchor } from "react-icons/ti";

function NotFound(){
    return(
        <div className = {style.wrapper}>
            <h1 className = {style.title}>Ops... Página não encontrada!​</h1>
            <TiAnchor />
        </div>
    )


}

export default NotFound;