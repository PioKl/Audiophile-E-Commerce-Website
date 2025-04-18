import Link from "next/link";
import styles from "../styles/button.module.scss";

interface NormalButtonProps {
  buttonType: "one" | "two" | "three" | "four";
  text: string;
  isInNav?: boolean; //Zwykłe przyciski z nawigacji są tworzone również na podstawie CategoryCard, gdyż CategoryCard jest używany w burgerMenu więc wystarczy, go trochę dostosować do wersji desktop, gdzie zostaje sam tekst z linkiem, więc jeśli jest w nawigacji to zostanie sam tekst z linkiem bez reszty elementów
  isALink: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

interface LinkButtonProps extends NormalButtonProps {
  isALink: true;
  link: string;
}

interface WithoutLinkButtonProps extends NormalButtonProps {
  isALink: false;
  link?: never;
}

type ButtonProps = LinkButtonProps | WithoutLinkButtonProps; //z linkiem lub bez może być, jak będzie isALink to wyskoczy, że poda link, inaczej nic się nie pojawi jeśli isALink jest false

const Button: React.FC<ButtonProps> = ({
  buttonType,
  text,
  isInNav = false, //domyślnie jest ustawiony, że nie jest nawigacją
  isALink,
  link,
  onClick,
  disabled,
}) => {
  const buttonClass = `${styles["btn"]} ${styles[`--${buttonType}`]} ${
    isInNav && styles["--nav"]
  } ${disabled && styles["--disabled"]}`;
  return isALink ? (
    <Link
      href={link as string}
      prefetch={false}
      className={buttonClass}
      aria-disabled={disabled ? true : false}
      tabIndex={disabled ? -1 : 0}
    >
      {text}
    </Link>
  ) : (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
