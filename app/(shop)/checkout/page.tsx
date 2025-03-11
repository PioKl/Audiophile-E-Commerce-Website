import styles from "@/styles/checkoutPage.module.scss";
import GoBackButton from "@/components/ui/GoBackButton";
import FormCheckout from "@/components/checkout/FormCheckout";

export default function Checkout() {
  return (
    <section className={`${styles["checkout-section"]}`}>
      <div className="wrapper">
        <GoBackButton />
      </div>
      <FormCheckout />
    </section>
  );
}
