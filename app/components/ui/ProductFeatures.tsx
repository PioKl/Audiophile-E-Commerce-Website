"use client";
import { Features } from "@/interfaces/interfaces";
import styles from "@/styles/ui/productFeatures.module.scss";
import { motion } from "framer-motion";

export default function ProductFeatures({ features, includes }: Features) {
  return (
    <div className={styles["product-features"]}>
      <div className={styles["product-features__features"]}>
        <motion.h3
          className={styles["product-features__features-heading"]}
          viewport={{ once: true }}
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { duration: 0.75, ease: "easeIn" },
          }}
        >
          Features
        </motion.h3>
        <motion.p
          className={styles["product-features__features-informations"]}
          viewport={{ once: true }}
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { duration: 0.75, ease: "easeIn" },
          }}
        >
          {features}
        </motion.p>
      </div>
      <div className={styles["product-features__in-the-box"]}>
        <motion.h3
          className={styles["product-features__in-the-box-heading"]}
          viewport={{ once: true }}
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { duration: 0.75, ease: "easeIn" },
          }}
        >
          In The Box
        </motion.h3>
        <motion.ul
          className={styles["product-features__in-the-box-items-list"]}
          viewport={{ once: true }}
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { duration: 0.75, ease: "easeIn" },
          }}
        >
          {includes.map((item, id) => (
            <li key={id}>
              <span
                className={`${styles["product-features__in-the-box-list-item"]} ${styles["--quantity"]}`}
              >
                {item.quantity}x
              </span>
              <span
                className={`${styles["product-features__in-the-box-list-item"]} ${styles["--item"]}`}
              >
                {item.item}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
