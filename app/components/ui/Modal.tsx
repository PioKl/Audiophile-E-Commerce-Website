import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import styles from "@/styles/ui/modal.module.scss";
import useIsElementVisible from "@/hooks/useIsElementVisible";

interface ModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const Modal = ({ openModal, setOpenModal, children }: ModalProps) => {
  const bodyRef = useRef<HTMLBodyElement>(null);
  const modalHook = document.getElementById("modal-hook");
  const modalRef = useRef<HTMLDivElement>(null);
  const isHeaderVisible = useIsElementVisible("header");

  useEffect(() => {
    bodyRef.current = document.body as HTMLBodyElement;
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      if (openModal) {
        modalRef.current?.focus();
      }
    }
  }, [openModal]);

  const handleClose = useCallback(() => {
    setOpenModal(false);
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
          className={`${styles["modal-overlay"]} ${
            !isHeaderVisible ? styles["--full"] : ""
          }`}
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
