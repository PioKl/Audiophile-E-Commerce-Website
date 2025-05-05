import Link from "next/link";
import styles from "../styles/button.module.scss";
import stylesLoader from "../styles/ui/loader.module.scss";
import Loader from "./ui/Loader";

interface NormalButtonProps {
  buttonType: "one" | "two" | "three" | "four";
  text: string;
  isInNav?: boolean; //Zwykłe przyciski z nawigacji są tworzone również na podstawie CategoryCard, gdyż CategoryCard jest używany w burgerMenu więc wystarczy, go trochę dostosować do wersji desktop, gdzie zostaje sam tekst z linkiem, więc jeśli jest w nawigacji to zostanie sam tekst z linkiem bez reszty elementów
  isALink: boolean;
  onClick?: () => void;
  disabled?: boolean;
  isButtonWithLoader?: boolean;
}

interface LinkButtonProps extends NormalButtonProps {
  isALink: true;
  link: string;
  isButtonWithLoader?: never; // Loader nie dotyczy linków
  loader?: never; // Loader nie dotyczy linków
}

interface WithoutLinkWithLoaderButtonProps extends NormalButtonProps {
  isALink: false;
  link?: never;
  isButtonWithLoader: true;
  loader: boolean;
}

interface WithoutLinkWithoutLoaderButtonProps extends NormalButtonProps {
  isALink: false;
  link?: never;
  isButtonWithLoader?: false;
  loader?: never;
}

type ButtonProps =
  | LinkButtonProps
  | WithoutLinkWithLoaderButtonProps
  | WithoutLinkWithoutLoaderButtonProps; //z linkiem lub bez może być, jak będzie isALink to wyskoczy, że poda link, inaczej nic się nie pojawi jeśli isALink jest false, także może być z loaderem lub bez, jak będzie isButtonWithLoader na true to wyskoczy, że trzaba przekazać loadera (będzie to jego stan)

const Button: React.FC<ButtonProps> = ({
  buttonType,
  text,
  isInNav = false, //domyślnie jest ustawiony, że nie jest nawigacją
  isALink,
  link,
  onClick,
  disabled,
  isButtonWithLoader,
  loader,
}) => {
  const buttonClass = `${styles["btn"]} ${styles[`--${buttonType}`]} ${
    isInNav && styles["--nav"]
  } ${disabled && styles["--disabled"]} ${
    isButtonWithLoader && styles["--with-loader"]
  }`;
  const loaderClass = `${
    isButtonWithLoader && stylesLoader["loader-in-button"]
  }`;
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
    <>
      <button className={buttonClass} onClick={onClick}>
        {loader ? <Loader className={loaderClass} /> : text}
      </button>
    </>
  );
};

export default Button;
