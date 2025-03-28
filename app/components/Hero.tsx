import React from "react";
import styles from "@/styles/hero.module.scss";
import Button from "./Button";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`wrapper ${styles["hero__container"]}`}>
        <div className={`${styles["hero__content"]}`}>
          <span className={`overline ${styles["hero__product-status"]}`}>
            New Product
          </span>
          <h1 className={`${styles["hero__heading"]}`}>
            XX99 Mark II HeadphoneS
          </h1>
          <p className={`${styles["hero__info"]}`}>
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <Button
            buttonType="one"
            text="See Product"
            isALink={true}
            link={`/headphones/xx99-mark-two-headphones`}
          />
        </div>
      </div>
    </section>
  );
}
