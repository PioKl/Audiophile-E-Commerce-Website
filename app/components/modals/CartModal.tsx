//Wersja z własnym modalem

import { Modal } from "@/components/ui/Modal";
import { useState } from "react";
import styles from "@/styles/modals/cartModal.module.scss";
import Image from "next/image";
import imageOne from "@/assets/cart/image-xx99-mark-two-headphones.jpg";
import imageTwo from "@/assets/cart/image-xx59-headphones.jpg";
import imageThree from "@/assets/cart/image-yx1-earphones.jpg";
import Button from "../Button";

interface CartModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartModal = ({ openModal, setOpenModal }: CartModalProps) => {
  const [counter, setCounter] = useState(1);

  const handleDecreaseQuantity = () => {
    setCounter((prevCounter) =>
      prevCounter > 1 ? prevCounter - 1 : prevCounter
    );
  };

  const handleIncreaseQuantity = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={`${styles["cart"]}`}>
        <div className={`${styles["cart-top"]}`}>
          <h2 className={`${styles["cart-top__heading"]}`}>Cart (3)</h2>
          <button className={`${styles["cart-top__remove-button"]}`}>
            Remove all
          </button>
        </div>

        <ul className={`${styles["products-list"]}`}>
          <li className={`${styles["product"]}`}>
            <Image
              className={`${styles["product__image"]}`}
              src={imageOne}
              alt="product-image"
              width={64}
              height={64}
            />
            <div className={`${styles["product-details"]}`}>
              <span className={`${styles["product-details__name"]}`}>
                XX99 MK II
              </span>
              <span className={`${styles["product-details__cost"]}`}>
                $ 2,999
              </span>
              <div
                className={`${styles["product-details__quantity-container"]}`}
              >
                <button
                  className={`${styles["product-details__quantity-button"]}`}
                  onClick={handleDecreaseQuantity}
                >
                  -
                </button>
                <span className={`${styles["product-details__quantity"]}`}>
                  {counter}
                </span>
                <button
                  className={`${styles["product-details__quantity-button"]}`}
                  onClick={handleIncreaseQuantity}
                >
                  +
                </button>
              </div>
            </div>
          </li>
          <li className={`${styles["product"]}`}>
            <Image
              className={`${styles["product__image"]}`}
              src={imageTwo}
              alt="product-image"
              width={64}
              height={64}
            />
            <div className={`${styles["product-details"]}`}>
              <span className={`${styles["product-details__name"]}`}>XX59</span>
              <span className={`${styles["product-details__cost"]}`}>
                $ 899
              </span>
              <div
                className={`${styles["product-details__quantity-container"]}`}
              >
                <button
                  className={`${styles["product-details__quantity-button"]}`}
                >
                  -
                </button>
                <span className={`${styles["product-details__quantity"]}`}>
                  2
                </span>
                <button
                  className={`${styles["product-details__quantity-button"]}`}
                >
                  +
                </button>
              </div>
            </div>
          </li>
          <li className={`${styles["product"]}`}>
            <Image
              className={`${styles["product__image"]}`}
              src={imageThree}
              alt="product-image"
              width={64}
              height={64}
            />
            <div className={`${styles["product-details"]}`}>
              <span className={`${styles["product-details__name"]}`}>YX1</span>
              <span className={`${styles["product-details__cost"]}`}>
                $ 599
              </span>
              <div
                className={`${styles["product-details__quantity-container"]}`}
              >
                <button
                  className={`${styles["product-details__quantity-button"]}`}
                >
                  -
                </button>
                <span className={`${styles["product-details__quantity"]}`}>
                  1
                </span>
                <button
                  className={`${styles["product-details__quantity-button"]}`}
                >
                  +
                </button>
              </div>
            </div>
          </li>
        </ul>
        <div className={`${styles["summary"]}`}>
          <span className={`${styles["summary__price-category"]}`}>Total</span>
          <span className={`${styles["summary__price"]}`}>$ 5,396</span>
        </div>
        <Button
          buttonType="one"
          text="Checkout"
          isALink={true}
          link="/checkout"
        />
      </div>
    </Modal>
  );
};
