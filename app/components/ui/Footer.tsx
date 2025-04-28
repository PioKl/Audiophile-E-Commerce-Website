import Link from "next/link";
import Logo from "@/assets/shared/desktop/logo.svg";
import IconFacebook from "@/assets/shared/desktop/icon-facebook.svg";
import IconTwitter from "@/assets/shared/desktop/icon-twitter.svg";
import IconInstagram from "@/assets/shared/desktop/icon-instagram.svg";
import styles from "@/styles/ui/footer.module.scss";
import { motion } from "framer-motion";

interface FooterProps {
  footerRef: React.RefObject<HTMLDivElement | null>;
  categories: string[];
}

export default function Footer({ footerRef, categories }: FooterProps) {
  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={`wrapper ${styles.container}`}>
        <motion.nav
          className={styles["container__nav"]}
          viewport={{ once: true }}
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { duration: 0.75, ease: "easeIn" },
          }}
        >
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
        </motion.nav>
        <motion.div
          className={styles["container__description-and-social"]}
          viewport={{ once: true }}
          initial={{ opacity: 0, y: "10%" }}
          whileInView={{
            y: "0",
            opacity: 1,
            transition: { duration: 0.75, ease: "easeIn" },
          }}
        >
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
        </motion.div>
      </div>
    </footer>
  );
}
