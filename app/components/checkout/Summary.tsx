import styles from "@/styles/checkout/summary.module.scss";
import Button from "../Button";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getCart } from "@/utils/api";
import { ExtendedCartItem } from "@/interfaces/interfaces";
import data from "@/data/data.json";
import { priceFormating } from "@/utils/formattingFunctions";
/* import OrderConfirmationModal from "../modals/OrderConfirmationModal"; */

export default function Summary() {
  const [cart, setCart] = useState<ExtendedCartItem[]>([]);
  /*  const [openOrderConfirmation, setOpenOrderConfirmation] = useState(false); */

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCart(data.cart);
      } catch (error) {
        console.error("Can't fetch data", error);
      }
    };
    fetchCart();
  }, [cart]);

  const cartWithImageData = cart.map((cartItem) => {
    const matchingData = data.find(
      (dataItem) => dataItem.name === cartItem.name
    );

    return {
      ...cartItem,
      cartImage: matchingData ? matchingData.cartImage : null,
    };
  });

  const shipping = 50;
  const vat = 0.2; //20%

  const totalPrice = cartWithImageData.reduce(
    (total, currentValue) =>
      (total = total + currentValue.price * currentValue.quantity),
    0
  );

  const totalPriceWithShipping = totalPrice + shipping;
  const includedVat = totalPrice * vat;

  return (
    <div className={`${styles["summary"]}`}>
      <h6 className={`${styles["summary__heading"]}`}>Summary</h6>
      {cart.length > 0 ? (
        <>
          <ul className={`${styles["summary__product-items-list"]}`}>
            {cartWithImageData.map(
              ({ id, cartImage, name, price, quantity }) => (
                <li key={id} className={`${styles["summary__product-item"]}`}>
                  {cartImage && (
                    <Image
                      className={`${styles["summary__product-image"]}`}
                      src={cartImage}
                      alt="product-image"
                      width={64}
                      height={64}
                    />
                  )}
                  <div className={`${styles["summary__product-details"]}`}>
                    <span className={`${styles["summary__product-name"]}`}>
                      {name}
                    </span>
                    <span className={`${styles["summary__product-cost"]}`}>
                      $ {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                    <span className={`${styles["summary__product-quantity"]}`}>
                      x{quantity}
                    </span>
                  </div>
                </li>
              )
            )}
          </ul>
          <ul className={`${styles["summary__cost-items-list"]}`}>
            <li className={`${styles["summary__cost-item"]}`}>
              <span className={`${styles["summary__price-category"]}`}>
                TOTAL
              </span>
              <span className={`${styles["summary__price"]}`}>
                $ {priceFormating(totalPrice)}
              </span>
            </li>
            <li className={`${styles["summary__cost-item"]}`}>
              <span className={`${styles["summary__price-category"]}`}>
                SHIPPING
              </span>
              <span className={`${styles["summary__price"]}`}>
                $ {priceFormating(shipping)}
              </span>
            </li>
            <li className={`${styles["summary__cost-item"]}`}>
              <span className={`${styles["summary__price-category"]}`}>
                VAT (INCLUDED)
              </span>
              <span className={`${styles["summary__price"]}`}>
                $ {priceFormating(includedVat)}
              </span>
            </li>
            <li className={`${styles["summary__cost-item"]}`}>
              <span className={`${styles["summary__price-category"]}`}>
                GRAND TOTAL
              </span>
              <span
                className={`${styles["summary__price"]} ${styles["--grand-total"]}`}
              >
                $ {priceFormating(totalPriceWithShipping)}
              </span>
            </li>
          </ul>
          <Button
            buttonType="one"
            text="CONTINUE & PAY"
            isALink={false}
            /*             onClick={() => {
              setOpenOrderConfirmation(true);
            }} */
          />
        </>
      ) : (
        <p>Cart is empty</p>
      )}
      {/*       {openOrderConfirmation && (
        <OrderConfirmationModal
          open={openOrderConfirmation}
          setOpen={setOpenOrderConfirmation}
        />
      )} */}
    </div>
  );
}
