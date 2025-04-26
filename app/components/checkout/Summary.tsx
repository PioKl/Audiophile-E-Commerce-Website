import styles from "@/styles/checkout/summary.module.scss";
import Button from "../Button";
import Image from "next/image";
import { useEffect, useContext } from "react";
import { priceFormating } from "@/utils/formattingFunctions";
import { useCartWithImage } from "@/hooks/useCartWithImage";
import OrderConfirmationModal from "../modals/OrderConfirmationModal";
import CartContext from "@/contexts/CartContext";

interface SummaryProps {
  openOrderConfirmation: boolean;
  setOpenOrderConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Summary({
  openOrderConfirmation,
  setOpenOrderConfirmation,
}: SummaryProps) {
  const { cart, setCart, refreshCart } = useContext(CartContext);

  useEffect(() => {
    refreshCart();
  }, [setCart, refreshCart]);

  const {
    cartWithImageData,
    shipping,
    totalPrice,
    includedVat,
    totalPriceWithShipping,
  } = useCartWithImage(cart);

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
          <Button buttonType="one" text="CONTINUE & PAY" isALink={false} />
        </>
      ) : (
        <span>Cart is empty</span>
      )}
      {openOrderConfirmation && (
        <OrderConfirmationModal
          open={openOrderConfirmation}
          setOpen={setOpenOrderConfirmation}
        />
      )}
    </div>
  );
}
