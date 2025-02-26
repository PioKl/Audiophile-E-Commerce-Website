"use client";
import { useRef } from "react";
import Link from "next/link";
import Logo from "@/assets/shared/desktop/logo.svg";
import BurgerMenu from "@/assets/shared/tablet/icon-hamburger.svg";
import Cart from "@/assets/shared/desktop/icon-cart.svg";
import styles from "@/styles/ui/header.module.scss";

export default function Header() {
  const btnOpen = useRef<HTMLButtonElement>(null);
  const btnClose = useRef<HTMLButtonElement>(null);
  const navMenu = useRef<HTMLDivElement>(null);

  const handleBtnOpen = () => {
    btnOpen.current?.setAttribute("aria-expanded", "true");
    btnClose.current?.focus();
  };
  const handleBtnClose = () => {
    btnOpen.current?.setAttribute("aria-expanded", "false");
  };
  return (
    <header className={styles.header}>
      <div className={`wrapper ${styles.container}`}>
        <nav className={styles["container__nav"]}>
          <button
            id="btnOpen"
            aria-expanded="false"
            aria-labelledby="nav-label"
            onClick={handleBtnOpen}
            ref={btnOpen}
            className={`${styles["container__nav-button"]} ${styles["container__burger-button"]} ${styles["container__burger-open-button"]}`}
          >
            <BurgerMenu />
          </button>
          <button
            id="btnClose"
            aria-label="Close"
            onClick={handleBtnClose}
            ref={btnClose}
            className={`${styles["container__nav-button"]} ${styles["container__burger-button"]} ${styles["container__burger-close-button"]}`}
          >
            <BurgerMenu />
          </button>
          <Link href="/">
            <Logo />
          </Link>
          <button
            className={`${styles["container__nav-button"]} ${styles["container__cart-button"]}`}
          >
            <Cart />
          </button>
          <div
            className={styles["nav-menu"]}
            role="dialog"
            aria-labelledby="nav-label"
            ref={navMenu}
          >
            <ul>
              <li>Headphones</li>
              <li>Speakers</li>
              <li>Earphones</li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
