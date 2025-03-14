import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "@/styles/ui/modal.module.scss";
import { enableBodyScroll } from "body-scroll-lock";

interface ModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const Modal = ({ setOpenModal, children }: ModalProps) => {
  const bodyRef = useRef<HTMLBodyElement>(null);
  const modalHook = document.getElementById("modal-hook");

  useEffect(() => {
    bodyRef.current = document.body as HTMLBodyElement;
    const bodyClick = (e: MouseEvent) => {
      const target = e.target as Element | null; // Rzutowanie na Element | null w celu pozbycią się błędu
      if (target && !target.closest(`.${styles["modal"]}`)) {
        //kliknięcie poza modal spowoduje wyłączenie modala
        setOpenModal(false);

        //Włączenie scrolla
        if (bodyRef.current) {
          enableBodyScroll(bodyRef.current);
        }
      }
    };

    document.body.addEventListener("click", bodyClick);

    return () => {
      document.body.removeEventListener("click", bodyClick);
    };
  }, [setOpenModal]);

  if (!modalHook) {
    return null;
  }

  return createPortal(
    <div className={`${styles["modal-overlay"]}`}>
      <div className={`wrapper`}>
        <div className={`${styles["modal"]}`}>{children}</div>
      </div>
    </div>,
    modalHook
  );
};
