//Wersja z własnym modalem

import { Modal } from "@/components/ui/Modal";
import { useState, useEffect } from "react";
import styles from "@/styles/modals/cartModal.module.scss";
import Button from "../Button";
import { CartItem } from "@/interfaces/interfaces";
import { getCart, removeAllProductsFromCart } from "@/utils/api";
import data from "@/data/data.json";
import CartModalProduct from "./CartModalProduct";
import { toast } from "react-toastify";

interface CartModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartModal = ({ openModal, setOpenModal }: CartModalProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const refreshCart = async () => {
    const data = await getCart();
    setCart(data.cart);
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const cartWithImageData = cart.map((cartItem) => {
    const matchingData = data.find(
      (dataItem) => dataItem.name === cartItem.name
    );

    return {
      ...cartItem,
      cartImage: matchingData ? matchingData.cartImage : null,
    };
  });

  const totalPrice = cartWithImageData.reduce(
    (total, currentValue) =>
      (total = total + currentValue.price * currentValue.quantity),
    0
  );

  const handleRemoveAllProductsFromCart = async () => {
    if (cart.length >= 1) {
      try {
        await removeAllProductsFromCart();
        await refreshCart();
        toast.success("Removed all products from cart");
      } catch (error) {
        console.log(
          "Removal of all products from cart failed, something went wrong:",
          error
        );
        toast.error(
          "Removal of all products from cart failed, something went wrong"
        );
      }
    } else {
      toast.error("Cart is empty");
      return;
    }
  };

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={`${styles["cart"]}`}>
        <div className={`${styles["cart-top"]}`}>
          <h2 className={`${styles["cart-top__heading"]}`}>
            Cart ({cartWithImageData.length})
          </h2>
          <button
            className={`${styles["cart-top__remove-button"]}`}
            onClick={handleRemoveAllProductsFromCart}
          >
            Remove all
          </button>
        </div>

        <ul className={`${styles["products-list"]}`}>
          {cartWithImageData.map((product) => (
            <CartModalProduct
              key={product.id}
              product={product}
              refreshCart={refreshCart}
            />
          ))}
        </ul>
        <div className={`${styles["summary"]}`}>
          <span className={`${styles["summary__price-category"]}`}>Total</span>
          <span className={`${styles["summary__price"]}`}>
            $ {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </span>
          {/* <span className={`${styles["summary__price"]}`}>$ 5,396</span> */}
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
