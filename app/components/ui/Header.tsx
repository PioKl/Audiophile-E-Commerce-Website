"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import Logo from "@/assets/shared/desktop/logo.svg";
import BurgerMenu from "@/assets/shared/tablet/icon-hamburger.svg";
import Cart from "@/assets/shared/desktop/icon-cart.svg";
import styles from "@/styles/ui/header.module.scss";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import CategoryCardList from "./CategoryCardList";

interface HeaderProps {
  mainRef: React.RefObject<HTMLDivElement | null>;
  footerRef: React.RefObject<HTMLDivElement | null>;
}

export default function Header({ mainRef, footerRef }: HeaderProps) {
  const bodyRef = useRef<HTMLBodyElement>(null);
  const btnOpen = useRef<HTMLButtonElement>(null);
  const btnClose = useRef<HTMLButtonElement>(null);
  const navMenu = useRef<HTMLDivElement>(null);

  //W celu uniknięcia błędu document is not defined gdy wcześniej tak było: const bodyRef = useRef<HTMLBodyElement>(document.body as HTMLBodyElement);
  useEffect(() => {
    bodyRef.current = document.body as HTMLBodyElement;
  }, []);

  const handleBtnOpen = () => {
    btnOpen.current?.setAttribute("aria-expanded", "true");

    //Odblokowanie możliwości interakcji (klawiatura i myszka) i widoczności dla accessibility
    navMenu.current?.removeAttribute("inert");
    navMenu.current?.removeAttribute("style");
    //Zablokowanie możliwości interakcji
    mainRef.current?.setAttribute("inert", "");
    footerRef.current?.setAttribute("inert", "");

    //Wyłączenie scrolla
    if (bodyRef.current) {
      disableBodyScroll(bodyRef.current);
    }
    //Ustaw focus na zamknięcie burgerMenu
    btnClose.current?.focus();
  };
  const handleBtnClose = () => {
    btnOpen.current?.setAttribute("aria-expanded", "false");

    //Zablokowanie możliwości interakcji (klawiatura i myszka) i widoczności dla accessibility
    navMenu.current?.setAttribute("inert", "");
    //Odblokowanie możliwości interakcji
    mainRef.current?.removeAttribute("inert");
    footerRef.current?.removeAttribute("inert");

    //Przywrócenie scrolla
    if (bodyRef.current) {
      enableBodyScroll(bodyRef.current);
    }

    //Ustaw focus na otwieranie burgerMenu
    btnOpen.current?.focus();

    //Żeby nie przesuwało się z dynamiczną zmianą rozdzielczości
    setTimeout(() => {
      if (navMenu.current) {
        navMenu.current.style.transition = "none";
      }
    }, 500);
  };

  useEffect(() => {
    const media = window.matchMedia("(max-width: 48em)");
    const setupNavMenu = () => {
      if (media.matches && navMenu.current) {
        //mobile
        //Zablokowanie możliwości interakcji (klawiatura i myszka) i widoczności dla accessibility
        navMenu.current.setAttribute("inert", "");

        //Żeby nie przesuwało się z dynamiczną zmianą rozdzielczości
        navMenu.current.style.transition = "none";
      } else {
        //desktop
        handleBtnClose();
        //Odblokowanie możliwości interakcji (klawiatura i myszka) i widoczności dla accessibility
        navMenu.current?.removeAttribute("inert");
      }
    };
    setupNavMenu();
    media.addEventListener("change", setupNavMenu);
    return () => media.removeEventListener("change", setupNavMenu);
  });

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
          <div
            className={styles["nav-menu"]}
            role="dialog"
            aria-labelledby="nav-label"
            ref={navMenu}
          >
            <div className={styles["nav-menu__item-list-container"]}>
              <CategoryCardList listType="menu" />
            </div>
          </div>
          <button
            className={`${styles["container__nav-button"]} ${styles["container__cart-button"]}`}
          >
            <Cart />
          </button>
        </nav>
      </div>
    </header>
  );
}
