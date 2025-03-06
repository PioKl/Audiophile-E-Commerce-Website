import { Features } from "@/interfaces/interfaces";
import styles from "@/styles/ui/productFeatures.module.scss";

export default function ProductFeatures({ features, includes }: Features) {
  return (
    <div className={styles["product-features"]}>
      <div className={styles["product-features__features"]}>
        <h3 className={styles["product-features__features-heading"]}>
          Features
        </h3>
        <p className={styles["product-features__features-informations"]}>
          {features}
        </p>
      </div>
      <div className={styles["product-features__in-the-box"]}>
        <h3 className={styles["product-features__in-the-box-heading"]}>
          In The Box
        </h3>
        <ul className={styles["product-features__in-the-box-items-list"]}>
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
        </ul>
      </div>
    </div>
  );
}
