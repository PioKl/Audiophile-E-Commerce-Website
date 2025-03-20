import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "@/styles/ui/modal.module.scss";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

interface ModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  mainRef: React.RefObject<HTMLDivElement | null>;
  footerRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}

export const Modal = ({
  openModal,
  setOpenModal,
  mainRef,
  footerRef,
  children,
}: ModalProps) => {
  const bodyRef = useRef<HTMLBodyElement>(null);
  const modalHook = document.getElementById("modal-hook");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current = document.body as HTMLBodyElement;
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      if (openModal) {
        disableBodyScroll(bodyRef.current);
        //Zablokowanie możliwości interakcji
        mainRef.current?.setAttribute("inert", "");
        footerRef.current?.setAttribute("inert", "");
        modalRef.current?.focus();
      }
    }
  }, [openModal, mainRef, footerRef]);

  const handleClose = useCallback(() => {
    setOpenModal(false);
    if (bodyRef.current) {
      enableBodyScroll(bodyRef.current);
      //Odblokowanie możliwości interakcji
      mainRef.current?.removeAttribute("inert");
      footerRef.current?.removeAttribute("inert");
    }
  }, [setOpenModal, mainRef, footerRef]);

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
          className={`${styles["modal-overlay"]}`}
        ></div>
        <div className={`wrapper ${styles["modal-wrapper"]}`}>
          <div
            tabIndex={0}
            ref={modalRef}
            id="modal"
            className={`${styles["modal"]}`}
          >
            {children}
          </div>
        </div>
      </div>
    </>,
    modalHook
  );
};
