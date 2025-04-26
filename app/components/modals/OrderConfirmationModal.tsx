import { Modal } from "@mui/material";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import styles from "@/styles/ui/muiModal.module.scss";
import stylesOrder from "@/styles/modals/orderConfirmation.module.scss";
import IconOrderConfirmation from "@/assets/checkout/icon-order-confirmation.svg";
import Image from "next/image";
import Button from "../Button";
import { CartItem } from "@/interfaces/interfaces";
import { getLastOrder } from "@/utils/api";
import { priceFormating } from "@/utils/formattingFunctions";
import { useCartWithImage } from "@/hooks/useCartWithImage";
import useIsElementVisible from "@/hooks/useIsElementVisible";

interface OrderConfirmationModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OrderConfirmationModal({
  open,
  setOpen,
}: OrderConfirmationModalProps) {
  const isHeaderVisible = useIsElementVisible("header");
  const [lastOrderItems, setLastOrderItems] = useState<CartItem[]>([]);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open) {
      const fetchLastOrder = async () => {
        try {
          const order = await getLastOrder();
          const boughtProducts = order.checkoutData.boughtProducts || [];
          setLastOrderItems(boughtProducts);
        } catch (error) {
          console.error("Error fetching last order:", error);
          setLastOrderItems([]);
        }
      };
      fetchLastOrder();
    }
  }, [open]);

  const { cartWithImageData, totalPriceWithShipping } =
    useCartWithImage(lastOrderItems);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableScrollLock={false}
      className={`${styles["modal"]} ${
        !isHeaderVisible ? styles["--full"] : ""
      }`}
      slotProps={{ backdrop: { style: { backgroundColor: "transparent" } } }}
    >
      <Box className={`${styles["modal-box-container"]}`}>
        <IconOrderConfirmation />
        <h3 className={`${styles["modal-box-container__heading"]}`}>
          Thank you for your order
        </h3>
        <p className={`${styles["modal-box-container__info"]}`}>
          You will receive an email confirmation shortly.
        </p>
        {cartWithImageData.length >= 1 && (
          <div className={`${stylesOrder["order"]}`}>
            <div className={`${stylesOrder["order__product-container"]}`}>
              <div
                className={`${stylesOrder["order__product-image-and-details"]}`}
              >
                {cartWithImageData[0].cartImage && (
                  <Image
                    className={`${stylesOrder["order__product-image"]}`}
                    src={cartWithImageData[0].cartImage}
                    alt="product-image"
                    width={50}
                    height={50}
                  />
                )}
                <div className={`${stylesOrder["order__product-details"]}`}>
                  <span className={`${stylesOrder["order__product-name"]}`}>
                    {cartWithImageData[0].name}
                  </span>
                  <span className={`${stylesOrder["order__product-cost"]}`}>
                    $ {priceFormating(cartWithImageData[0].price)}
                  </span>
                  <span className={`${stylesOrder["order__product-quantity"]}`}>
                    x{cartWithImageData[0].quantity}
                  </span>
                </div>
              </div>
              {cartWithImageData.length > 1 && (
                <span className={`${stylesOrder["order__rest-of-products"]}`}>
                  and {cartWithImageData.length - 1} other item(s)
                </span>
              )}
            </div>

            <div className={`${stylesOrder["order__summary"]}`}>
              <span
                className={`${stylesOrder["order__summary-price-category"]}`}
              >
                Grand Total
              </span>
              <span className={`${stylesOrder["order__summary-price"]}`}>
                $ {priceFormating(totalPriceWithShipping)}
              </span>
            </div>
          </div>
        )}

        <Button buttonType="one" text="Back To Home" isALink={true} link="/" />
      </Box>
    </Modal>
  );
}
