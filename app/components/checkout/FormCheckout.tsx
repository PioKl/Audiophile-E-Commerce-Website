"use client";
import { useState, useContext } from "react";
import Summary from "./Summary";
import IconCashOnDelivery from "@/assets/checkout/icon-cash-on-delivery.svg";
import styles from "@/styles/ui/form.module.scss";
import { CheckoutData } from "@/interfaces/interfaces";
import { completeCheckout } from "@/utils/api";
import {
  emailRegex,
  phoneRegex,
  zipCodeRegex,
  eMoneyRegex,
} from "@/utils/regex";
import CartContext from "@/contexts/CartContext";

export default function FormCheckout() {
  const { refreshCart } = useContext(CartContext);
  const [openOrderConfirmation, setOpenOrderConfirmation] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<
    "e-money" | "cash-on-delivery"
  >("e-money");
  const handlePaymentMethod = (e: React.MouseEvent<HTMLInputElement>) => {
    setPaymentMethod(e.currentTarget.id as "e-money" | "cash-on-delivery");
  };

  const [errors, setErrors] = useState({
    name: false,
    emailAddress: false,
    phoneNumber: false,
    address: false,
    zipCode: false,
    city: false,
    country: false,
    eMoneyNumber: false,
    eMoneyPin: false,
  });

  const [values, setValues] = useState<CheckoutData>({
    name: "",
    emailAddress: "",
    phoneNumber: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    paymentMethod: "e-money", //Domyślna wartość
    eMoneyNumber: "",
    eMoneyPin: "",
  });

  const messages = {
    textFieldError: "Wrong Format",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      name: values.name === "",
      emailAddress:
        values.emailAddress === "" || !emailRegex.test(values.emailAddress),
      phoneNumber:
        values.phoneNumber === "" || !phoneRegex.test(values.phoneNumber),
      address: values.address === "",
      zipCode:
        values.zipCode === "" ||
        (!zipCodeRegex.standard.test(values.zipCode) &&
          !zipCodeRegex.withoutDash.test(values.zipCode)),
      city: values.city === "",
      country: values.country === "",
      eMoneyNumber:
        paymentMethod === "e-money" &&
        (!values.eMoneyNumber ||
          values.eMoneyNumber === "" ||
          !eMoneyRegex.test(values.eMoneyNumber)),
      eMoneyPin:
        paymentMethod === "e-money" &&
        (!values.eMoneyPin ||
          values.eMoneyPin === "" ||
          !eMoneyRegex.test(values.eMoneyPin)), //!values.eMoneyPin || values.eMoneyPin === "" w celu zapobiegnięciu błędu o undefined
    };

    if (
      newErrors.name ||
      newErrors.emailAddress ||
      newErrors.phoneNumber ||
      newErrors.address ||
      newErrors.zipCode ||
      newErrors.city ||
      newErrors.country ||
      (paymentMethod === "e-money" &&
        (newErrors.eMoneyNumber || newErrors.eMoneyPin))
    ) {
      setErrors(newErrors);
    } else {
      //Mechanika enpointa, try await np. do api
      //----------------------------------
      //zresetowanie wartości
      try {
        await completeCheckout({ ...values, paymentMethod });

        setErrors((prevErrors) => ({
          ...prevErrors,
          name: false,
          emailAddress: false,
          phoneNumber: false,
          address: false,
          zipCode: false,
          city: false,
          country: false,
          eMoneyNumber: false,
          eMoneyPin: false,
        }));
        setValues((prevValues) => ({
          ...prevValues,
          name: "",
          emailAddress: "",
          phoneNumber: "",
          address: "",
          zipCode: "",
          city: "",
          country: "",
          eMoneyNumber: "",
          eMoneyPin: "",
        }));
        refreshCart();
        setOpenOrderConfirmation(true);
      } catch (error) {
        console.error("Error during checkout:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`wrapper ${styles["form"]}`}>
      <div className={`${styles["checkout"]}`}>
        <h2 className={`${styles["checkout__heading"]}`}>Checkout</h2>
        <div className={`${styles["inputs"]}`}>
          <div className={`${styles["inputs__details-container"]}`}>
            <h4 className={`sub-title ${styles["inputs__heading"]}`}>
              Billing Details
            </h4>
            <div className={`${styles["inputs__labels-container"]}`}>
              <label
                htmlFor="name"
                className={`${styles["inputs__label"]} ${
                  errors.name && styles["--error"]
                }`}
              >
                <div className={`${styles["inputs__label-title-container"]}`}>
                  <span className={`${styles["inputs__label-title"]}`}>
                    Name
                  </span>
                  {errors.name && (
                    <span className={`${styles["inputs__label-error"]}`}>
                      {messages.textFieldError}
                    </span>
                  )}
                </div>

                <input
                  id="name"
                  type="text"
                  placeholder="Insert your name"
                  className={`${styles["inputs__input"]}`}
                  value={values.name}
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                />
              </label>

              <label
                htmlFor="mail"
                className={`${styles["inputs__label"]} ${
                  errors.emailAddress && styles["--error"]
                }`}
              >
                <div className={`${styles["inputs__label-title-container"]}`}>
                  <span className={`${styles["inputs__label-title"]}`}>
                    Email Address
                  </span>
                  {errors.emailAddress && (
                    <span className={`${styles["inputs__label-error"]}`}>
                      {messages.textFieldError}
                    </span>
                  )}
                </div>

                <input
                  className={`${styles["inputs__input"]}`}
                  id="mail"
                  type="email"
                  placeholder="alexei@mail.com"
                  value={values.emailAddress}
                  onChange={(e) =>
                    setValues({ ...values, emailAddress: e.target.value })
                  }
                />
              </label>

              <label
                htmlFor="phone"
                className={`${styles["inputs__label"]} ${
                  errors.phoneNumber && styles["--error"]
                }`}
              >
                <div className={`${styles["inputs__label-title-container"]}`}>
                  <span className={`${styles["inputs__label-title"]}`}>
                    Phone Number
                  </span>
                  {errors.phoneNumber && (
                    <span className={`${styles["inputs__label-error"]}`}>
                      {messages.textFieldError}
                    </span>
                  )}
                </div>

                <input
                  className={`${styles["inputs__input"]}`}
                  id="phone"
                  type="text"
                  placeholder="+1 202-555-0136"
                  value={values.phoneNumber}
                  onChange={(e) =>
                    setValues({ ...values, phoneNumber: e.target.value })
                  }
                />
              </label>
            </div>
          </div>
          <div className={`${styles["inputs__details-container"]}`}>
            <h4 className={`sub-title ${styles["inputs__heading"]}`}>
              Shipping Info
            </h4>
            <div
              className={`${styles["inputs__labels-container"]} ${styles["--shipping"]}`}
            >
              <label
                htmlFor="address"
                className={`${styles["inputs__label"]} ${
                  errors.address && styles["--error"]
                }`}
              >
                <div className={`${styles["inputs__label-title-container"]}`}>
                  <span className={`${styles["inputs__label-title"]}`}>
                    Address
                  </span>
                  {errors.address && (
                    <span className={`${styles["inputs__label-error"]}`}>
                      {messages.textFieldError}
                    </span>
                  )}
                </div>

                <input
                  className={`${styles["inputs__input"]}`}
                  id="address"
                  type="text"
                  placeholder="1137 Williams Avenue"
                  value={values.address}
                  onChange={(e) =>
                    setValues({ ...values, address: e.target.value })
                  }
                />
              </label>

              <label
                htmlFor="zip-code"
                className={`${styles["inputs__label"]} ${
                  errors.zipCode && styles["--error"]
                }`}
              >
                <div className={`${styles["inputs__label-title-container"]}`}>
                  <span className={`${styles["inputs__label-title"]}`}>
                    ZIP Code
                  </span>
                  {errors.zipCode && (
                    <span className={`${styles["inputs__label-error"]}`}>
                      {messages.textFieldError}
                    </span>
                  )}
                </div>

                <input
                  className={`${styles["inputs__input"]}`}
                  id="zip-code"
                  type="text"
                  placeholder="10001"
                  value={values.zipCode}
                  onChange={(e) =>
                    setValues({ ...values, zipCode: e.target.value })
                  }
                />
              </label>

              <label
                htmlFor="city"
                className={`${styles["inputs__label"]} ${
                  errors.city && styles["--error"]
                }`}
              >
                <div className={`${styles["inputs__label-title-container"]}`}>
                  <span className={`${styles["inputs__label-title"]}`}>
                    City
                  </span>
                  {errors.city && (
                    <span className={`${styles["inputs__label-error"]}`}>
                      {messages.textFieldError}
                    </span>
                  )}
                </div>

                <input
                  className={`${styles["inputs__input"]}`}
                  id="city"
                  type="text"
                  placeholder="New York"
                  value={values.city}
                  onChange={(e) =>
                    setValues({ ...values, city: e.target.value })
                  }
                />
              </label>
              <label
                htmlFor="country"
                className={`${styles["inputs__label"]} ${
                  errors.country && styles["--error"]
                }`}
              >
                <div className={`${styles["inputs__label-title-container"]}`}>
                  <span className={`${styles["inputs__label-title"]}`}>
                    Country
                  </span>
                  {errors.country && (
                    <span className={`${styles["inputs__label-error"]}`}>
                      {messages.textFieldError}
                    </span>
                  )}
                </div>

                <input
                  className={`${styles["inputs__input"]}`}
                  id="country"
                  type="text"
                  placeholder="United States"
                  value={values.country}
                  onChange={(e) =>
                    setValues({ ...values, country: e.target.value })
                  }
                />
              </label>
            </div>
          </div>
          <div className={`${styles["inputs__details-container"]}`}>
            <h4 className={`sub-title ${styles["inputs__heading"]}`}>
              Payment Details
            </h4>
            <div
              className={`${styles["inputs__labels-container"]} ${styles["--radio"]}`}
            >
              <span className={`${styles["inputs__radio-title"]}`}>
                Payment Method
              </span>
              <label
                htmlFor="e-money"
                className={`${styles["inputs__label"]} ${styles["--radio"]}`}
              >
                <input
                  id="e-money"
                  type="radio"
                  name="payment-method"
                  defaultChecked={true}
                  className={`${styles["inputs__input"]} ${styles["--radio"]}`}
                  onClick={handlePaymentMethod}
                />
                <span className={`${styles["inputs__label-title"]}`}>
                  e-money
                </span>
              </label>
              <label
                htmlFor="cash-on-delivery"
                className={`${styles["inputs__label"]} ${styles["--radio"]}`}
              >
                <input
                  id="cash-on-delivery"
                  type="radio"
                  name="payment-method"
                  className={`${styles["inputs__input"]} ${styles["--radio"]}`}
                  onClick={handlePaymentMethod}
                />
                <span className={`${styles["inputs__label-title"]}`}>
                  Cash on Delivery
                </span>
              </label>
            </div>
          </div>
          <div className={`${styles["inputs__details-container"]}`}>
            <div
              className={`${styles["inputs__labels-container"]} ${
                paymentMethod === "cash-on-delivery" && styles["--cash-on"]
              }`}
            >
              {paymentMethod === "e-money" ? (
                <>
                  <label
                    htmlFor="e-money-number"
                    className={`${styles["inputs__label"]} ${
                      errors.eMoneyNumber && styles["--error"]
                    }`}
                  >
                    <div
                      className={`${styles["inputs__label-title-container"]}`}
                    >
                      <span className={`${styles["inputs__label-title"]}`}>
                        e-Money Number
                      </span>
                      {errors.eMoneyNumber && (
                        <span className={`${styles["inputs__label-error"]}`}>
                          {messages.textFieldError}
                        </span>
                      )}
                    </div>

                    <input
                      className={`${styles["inputs__input"]}`}
                      id="e-money-number"
                      type="text"
                      minLength={9}
                      maxLength={9}
                      inputMode="numeric" // Klawiatura numeryczna na urządzeniach mobilnych
                      placeholder="238521993"
                      value={values.eMoneyNumber}
                      onChange={(e) =>
                        setValues({ ...values, eMoneyNumber: e.target.value })
                      }
                    />
                  </label>

                  <label
                    htmlFor="e-money-pin"
                    className={`${styles["inputs__label"]} ${
                      errors.eMoneyPin && styles["--error"]
                    }`}
                  >
                    <div
                      className={`${styles["inputs__label-title-container"]}`}
                    >
                      <span className={`${styles["inputs__label-title"]}`}>
                        e-Money PIN
                      </span>
                      {errors.eMoneyPin && (
                        <span className={`${styles["inputs__label-error"]}`}>
                          {messages.textFieldError}
                        </span>
                      )}
                    </div>

                    <input
                      className={`${styles["inputs__input"]}`}
                      id="e-money-pin"
                      type="text"
                      minLength={4}
                      maxLength={4}
                      inputMode="numeric" // Klawiatura numeryczna na urządzeniach mobilnych
                      placeholder="6891"
                      value={values.eMoneyPin}
                      onChange={(e) =>
                        setValues({ ...values, eMoneyPin: e.target.value })
                      }
                    />
                  </label>
                </>
              ) : (
                <div className={`${styles["payment-info"]}`}>
                  <IconCashOnDelivery
                    className={`${styles["payment-info__icon"]}`}
                  />
                  <p className={`${styles["payment-info__text"]}`}>
                    The ‘Cash on Delivery’ option enables you to pay in cash
                    when our delivery courier arrives at your residence. Just
                    make sure your address is correct so that your order will
                    not be cancelled.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Summary
        openOrderConfirmation={openOrderConfirmation}
        setOpenOrderConfirmation={setOpenOrderConfirmation}
      />
    </form>
  );
}
