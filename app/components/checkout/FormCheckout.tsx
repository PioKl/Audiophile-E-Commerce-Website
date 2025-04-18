"use client";
import { useState } from "react";
import Summary from "./Summary";
import IconCashOnDelivery from "@/assets/checkout/icon-cash-on-delivery.svg";
import styles from "@/styles/ui/form.module.scss";

export default function FormCheckout() {
  const [paymentMethod, setPaymentMethod] = useState<string>("e-money");
  const handlePaymentMethod = (e: React.MouseEvent<HTMLInputElement>) => {
    setPaymentMethod(e?.currentTarget.id);
  };

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phoneNumber: false,
    address: false,
    zipCode: false,
    city: false,
    country: false,
    eMoneyNumber: false,
    eMoneyPin: false,
  });

  const [values, setValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
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
      email: values.email === "",
      phoneNumber: values.phoneNumber === "",
      address: values.address === "",
      zipCode: values.zipCode === "",
      city: values.city === "",
      country: values.country === "",
      eMoneyNumber: values.eMoneyNumber === "",
      eMoneyPin: values.eMoneyPin === "",
    };

    if (
      newErrors.name ||
      newErrors.email ||
      newErrors.phoneNumber ||
      newErrors.address ||
      newErrors.zipCode ||
      newErrors.city ||
      newErrors.country ||
      newErrors.eMoneyNumber ||
      newErrors.eMoneyPin
    ) {
      setErrors(newErrors);
    } else {
      //Mechanika enpointa, try await np. do api
      //----------------------------------
      //zresetowanie wartości
      console.log(
        values.name,
        values.email,
        values.phoneNumber,
        values.address,
        values.zipCode,
        values.city,
        values.country,
        values.eMoneyNumber,
        values.eMoneyPin
      );
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: false,
        email: false,
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
        email: "",
        phoneNumber: "",
        address: "",
        zipCode: "",
        city: "",
        country: "",
        eMoneyNumber: "",
        eMoneyPin: "",
      }));
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
                  errors.email && styles["--error"]
                }`}
              >
                <div className={`${styles["inputs__label-title-container"]}`}>
                  <span className={`${styles["inputs__label-title"]}`}>
                    Email Address
                  </span>
                  {errors.email && (
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
                  value={values.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
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
      <Summary />
    </form>
  );
}
