import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import styles from "@/styles/ui/muiModal.module.scss";
import stylesOrder from "@/styles/modals/orderConfirmation.module.scss";
import IconOrderConfirmation from "@/assets/checkout/icon-order-confirmation.svg";
import Image from "next/image";
import Button from "../Button";

import imageOne from "@/assets/cart/image-xx99-mark-two-headphones.jpg";

interface OrderConfirmationModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OrderConfirmationModal({
  open,
  setOpen,
}: OrderConfirmationModalProps) {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableScrollLock={false}
      className={`${styles["modal"]}`}
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
        <div className={`${stylesOrder["order"]}`}>
          <div className={`${stylesOrder["order__product-container"]}`}>
            <div
              className={`${stylesOrder["order__product-image-and-details"]}`}
            >
              <Image
                className={`${stylesOrder["order__product-image"]}`}
                src={imageOne}
                alt="product-image"
                width={50}
                height={50}
              />
              <div className={`${stylesOrder["order__product-details"]}`}>
                <span className={`${stylesOrder["order__product-name"]}`}>
                  XX99 MK II
                </span>
                <span className={`${stylesOrder["order__product-cost"]}`}>
                  $ 2,999
                </span>
                <span className={`${stylesOrder["order__product-quantity"]}`}>
                  x1
                </span>
              </div>
            </div>

            <span className={`${stylesOrder["order__rest-of-products"]}`}>
              and 2 other item(s)
            </span>
          </div>

          <div className={`${stylesOrder["order__summary"]}`}>
            <span className={`${stylesOrder["order__summary-price-category"]}`}>
              Grand Total
            </span>
            <span className={`${stylesOrder["order__summary-price"]}`}>
              $ 5,446
            </span>
          </div>
        </div>

        <Button buttonType="one" text="Back To Home" isALink={true} link="/" />
      </Box>
    </Modal>
  );
}
