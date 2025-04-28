import React from "react";
import styles from "@/styles/hero.module.scss";
import Button from "./Button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`wrapper ${styles["hero__container"]}`}>
        <motion.div
          className={`${styles["hero__content"]}`}
          viewport={{ once: true }}
          initial={{ opacity: 0, y: "10%" }}
          whileInView={{
            y: "0",
            opacity: 1,
            transition: { duration: 0.75, ease: "easeIn" },
          }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}
