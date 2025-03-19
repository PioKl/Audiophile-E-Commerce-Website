import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "@/styles/ui/modal.module.scss";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

interface ModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const Modal = ({ openModal, setOpenModal, children }: ModalProps) => {
  const bodyRef = useRef<HTMLBodyElement>(null);
  const modalHook = document.getElementById("modal-hook");

  useEffect(() => {
    bodyRef.current = document.body as HTMLBodyElement;
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      if (openModal) {
        disableBodyScroll(bodyRef.current);
      }
    }
  }, [openModal]);

  const handleClose = useCallback(() => {
    setOpenModal(false);
    if (bodyRef.current) {
      enableBodyScroll(bodyRef.current);
    }
  }, [setOpenModal]);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    if (openModal) {
      document.addEventListener("keydown", handleEscape, false);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape, openModal]);

  if (!modalHook) {
    return null;
  }

  return createPortal(
    <>
      <div className={`${styles["modal-container"]}`}>
        <div
          onClick={handleClose}
          className={`${styles["modal-total-overlay"]}`}
        ></div>
        <div
          onClick={handleClose}
          className={`${styles["modal-overlay"]}`}
        ></div>

        <div className={`wrapper ${styles["modal-wrapper"]}`}>
          <div id="modal" className={`${styles["modal"]}`}>
            {children}
          </div>
        </div>
      </div>
    </>,
    modalHook
  );
};
