"use client";
import { useContext } from "react";
import styles from "@/styles/checkoutPage.module.scss";
import GoBackButton from "@/components/ui/GoBackButton";
import FormCheckout from "@/components/checkout/FormCheckout";
import AuthContext from "@/contexts/AuthContext";
import Loader from "@/components/ui/Loader";

export default function Checkout() {
  const { isUserLoggedIn } = useContext(AuthContext);

  return (
    <section
      className={`${styles["checkout-section"]} ${
        !isUserLoggedIn && styles[`--no-auth`]
      }`}
    >
      {isUserLoggedIn ? (
        <>
          <div className="wrapper">
            <GoBackButton />
          </div>
          <FormCheckout />
        </>
      ) : (
        <Loader aria-label="Checking if user is logged in" />
      )}
    </section>
  );
}
