import styles from "../styles/button.module.scss";

interface ButtonProps {
  buttonType: "one" | "two" | "three";
  text: string;
}

const Button: React.FC<ButtonProps> = ({ buttonType, text }) => {
  const buttonClass = `${styles["btn"]} ${styles[`--${buttonType}`]}`;
  return <button className={buttonClass}>{text}</button>;
};

export default Button;
