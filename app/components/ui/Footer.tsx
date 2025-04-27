import Link from "next/link";
import Logo from "@/assets/shared/desktop/logo.svg";
import IconFacebook from "@/assets/shared/desktop/icon-facebook.svg";
import IconTwitter from "@/assets/shared/desktop/icon-twitter.svg";
import IconInstagram from "@/assets/shared/desktop/icon-instagram.svg";
import styles from "@/styles/ui/footer.module.scss";

interface FooterProps {
  footerRef: React.RefObject<HTMLDivElement | null>;
  categories: string[];
}

export default function Footer({ footerRef, categories }: FooterProps) {
  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={`wrapper ${styles.container}`}>
        <nav className={styles["container__nav"]}>
          <Link href="/">
            <Logo />
          </Link>
          <ul className={` ${styles["container__links-list"]}`}>
            <li className={styles["container__link-item"]}>
              <Link className="nav-link" href="/">
                Home
              </Link>
            </li>
            {categories.map((item, id) => (
              <li key={id} className={styles["container__link-item"]}>
                <Link className="nav-link" href={`/${item}`}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles["container__description-and-social"]}>
          <p className={`${styles["container__description"]}`}>
            Audiophile is an all in one stop to fulfill your audio needs.
            We&apos;re a small team of music lovers and sound specialists who
            are devoted to helping you get the most out of personal audio. Come
            and visit our demo facility - we’re open 7 days a week.
          </p>
          <span className={`${styles["container__copyright"]}`}>
            Copyright 2021. All Rights Reserved
          </span>
          <ul className={`${styles["container__social-list"]}`}>
            <li className={`${styles["container__social-item"]}`}>
              <Link href="/">
                <IconFacebook />
              </Link>
            </li>
            <li className={`${styles["container__social-item"]}`}>
              <Link href="/">
                <IconTwitter />
              </Link>
            </li>
            <li className={`${styles["container__social-item"]}`}>
              <Link href="/">
                <IconInstagram />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
