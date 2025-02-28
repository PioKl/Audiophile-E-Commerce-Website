import Link from "next/link";
import styles from "../styles/button.module.scss";

interface NormalButtonProps {
  buttonType: "one" | "two" | "three";
  text: string;
  isInNav?: boolean; //Zwykłe przyciski z nawigacji są tworzone również na podstawie CategoryCard, gdyż CategoryCard jest używany w burgerMenu więc wystarczy, go trochę dostosować do wersji desktop, gdzie zostaje sam tekst z linkiem, więc jeśli jest w nawigacji to zostanie sam tekst z linkiem bez reszty elementów
  isALink: boolean;
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
}) => {
  const buttonClass = `${styles["btn"]} ${styles[`--${buttonType}`]} ${
    isInNav && styles["--nav"]
  }`;
  return isALink ? (
    <Link href={link as string} prefetch={false} className={buttonClass}>
      {text}
    </Link>
  ) : (
    <button className={buttonClass}>{text}</button>
  );
};

export default Button;
