import style from "./Button.module.css";


interface ButtonProps {
  text: string;
  className?: string;
}


function Button({ text, className }: ButtonProps) {
 
  const buttonClass = className
    ? `${style.button} ${className}`
    : style.button;


  return (
    <button type="submit" className={buttonClass}>
      {text}
    </button>
  );
}


export default Button;


