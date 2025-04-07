import { useState } from "react";
import { CartItem } from "@/interfaces/interfaces";
import styles from "@/styles/modals/cartModalProduct.module.scss";
import Image from "next/image";
import { updateCartItem, removeFromCart } from "@/utils/api";
import { toast } from "react-toastify";

interface CartModalProductProps {
  product: CartItem & { cartImage: string | null }; // rozszerzenie o cartImage
  refreshCart: () => Promise<void>;
}

export default function CartModalProduct({
  product,
  refreshCart,
}: CartModalProductProps) {
  const { id, cartImage, name, price, quantity } = product;

  const [counter, setCounter] = useState(quantity);

  const handleDecreaseQuantity = async () => {
    const prevCounter = counter;
    try {
      if (counter > 1) {
        const newCounter = counter - 1;
        setCounter(newCounter);
        await updateCartItem(id, newCounter);
        await refreshCart();
      } else if (counter === 1) {
        await removeFromCart(id);
        await refreshCart();
        toast.success("Product removed from cart");
      }
    } catch (error) {
      console.log("Quantity descrease failed, something went wrong:", error);
      toast.error("Quantity descrease failed, something went wrong");
      setCounter(prevCounter); //Gdyby coś poszło nie tak, niech wstawi poprzednią wartość, która była przed update
      await refreshCart();
    }
  };

  const handleIncreaseQuantity = async () => {
    const prevCounter = counter;
    try {
      const newCounter = counter + 1;
      setCounter(newCounter);
      await updateCartItem(id, newCounter);
      await refreshCart();
    } catch (error) {
      console.error("Quantity increase failed, something went wrong:", error);
      toast.error("Quantity increase failed, something went wrong");
      setCounter(prevCounter); //Gdyby coś poszło nie tak, niech wstawi poprzednią wartość, która była przed update
    }
  };

  return (
    <li key={id} className={`${styles["product"]}`}>
      {cartImage && (
        <Image
          className={`${styles["product__image"]}`}
          src={cartImage}
          alt="product-image"
          width={64}
          height={64}
        />
      )}
      <div className={`${styles["product-details"]}`}>
        <span className={`${styles["product-details__name"]}`}>{name}</span>
        <span className={`${styles["product-details__cost"]}`}>$ {price}</span>
        <div className={`${styles["product-details__quantity-container"]}`}>
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
  );
}
