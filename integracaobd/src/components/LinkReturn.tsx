import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import style from "/src/components/LinkReturn.module.css";

interface LinkReturnProps {
    className?: string;
}

function LinkReturn({ className }: LinkReturnProps){
    return(
         <div className={`${style.containerReturn} `}>
          <GoArrowLeft className={style.iconReturn} />
          <Link className={`${style.linkReturn} ${className}`} to="/">Voltar</Link>
        </div>

    )
}

export default LinkReturn ; 