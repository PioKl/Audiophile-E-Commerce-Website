import styles from "@/styles/checkout/summary.module.scss";
import Button from "../Button";
import Image from "next/image";

import imageOne from "@/assets/cart/image-xx99-mark-two-headphones.jpg";
import imageTwo from "@/assets/cart/image-xx59-headphones.jpg";
import imageThree from "@/assets/cart/image-yx1-earphones.jpg";

export default function Summary() {
  return (
    <div className={`${styles["summary"]}`}>
      <h6 className={`${styles["summary__heading"]}`}>Summary</h6>
      <ul className={`${styles["summary__product-items-list"]}`}>
        <li className={`${styles["summary__product-item"]}`}>
          <Image
            className={`${styles["summary__product-image"]}`}
            src={imageOne}
            alt="product-image"
            width={64}
            height={64}
          />
          <div className={`${styles["summary__product-details"]}`}>
            <span className={`${styles["summary__product-name"]}`}>
              XX99 MK II
            </span>
            <span className={`${styles["summary__product-cost"]}`}>
              $ 2,999
            </span>
            <span className={`${styles["summary__product-quantity"]}`}>x1</span>
          </div>
        </li>
        <li className={`${styles["summary__product-item"]}`}>
          <Image
            className={`${styles["summary__product-image"]}`}
            src={imageTwo}
            alt="product-image"
            width={64}
            height={64}
          />
          <div className={`${styles["summary__product-details"]}`}>
            <span className={`${styles["summary__product-name"]}`}>XX59</span>
            <span className={`${styles["summary__product-cost"]}`}>$ 899</span>
            <span className={`${styles["summary__product-quantity"]}`}>x2</span>
          </div>
        </li>
        <li className={`${styles["summary__product-item"]}`}>
          <Image
            className={`${styles["summary__product-image"]}`}
            src={imageThree}
            alt="product-image"
            width={64}
            height={64}
          />
          <div className={`${styles["summary__product-details"]}`}>
            <span className={`${styles["summary__product-name"]}`}>YX1</span>
            <span className={`${styles["summary__product-cost"]}`}>$ 599</span>
            <span className={`${styles["summary__product-quantity"]}`}>x1</span>
          </div>
        </li>
      </ul>
      <ul className={`${styles["summary__cost-items-list"]}`}>
        <li className={`${styles["summary__cost-item"]}`}>
          <span className={`${styles["summary__price-category"]}`}>TOTAL</span>
          <span className={`${styles["summary__price"]}`}>$ 5,396</span>
        </li>
        <li className={`${styles["summary__cost-item"]}`}>
          <span className={`${styles["summary__price-category"]}`}>
            SHIPPING
          </span>
          <span className={`${styles["summary__price"]}`}>$ 50</span>
        </li>
        <li className={`${styles["summary__cost-item"]}`}>
          <span className={`${styles["summary__price-category"]}`}>
            VAT (INCLUDED)
          </span>
          <span className={`${styles["summary__price"]}`}>$ 1,079</span>
        </li>
        <li className={`${styles["summary__cost-item"]}`}>
          <span className={`${styles["summary__price-category"]}`}>
            GRAND TOTAL
          </span>
          <span
            className={`${styles["summary__price"]} ${styles["--grand-total"]}`}
          >
            $ 5,446
          </span>
        </li>
      </ul>
      <Button buttonType="one" text="CONTINUE & PAY" isALink={false} />
    </div>
  );
}
