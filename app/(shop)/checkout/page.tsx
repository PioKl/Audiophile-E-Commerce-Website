import styles from "@/styles/checkoutPage.module.scss";
import GoBackButton from "@/components/ui/GoBackButton";

export default function Checkout() {
  return (
    <section className={`${styles["checkout-section"]}`}>
      <div className="wrapper">
        <GoBackButton />
      </div>

      <form className={`wrapper ${styles["form"]}`}>
        <div className={`${styles["checkout"]}`}>
          <h2 className={`${styles["checkout__heading"]}`}>Checkout</h2>
          <div className={`${styles["inputs"]}`}>
            <div className={`${styles["inputs__details-container"]}`}>
              <h4 className={`sub-title ${styles["inputs__heading"]}`}>
                Billing Details
              </h4>
              <div className={`${styles["inputs__labels-container"]}`}>
                <label htmlFor="name" className={`${styles["inputs__label"]}`}>
                  <span className={`${styles["inputs__label-title"]}`}>
                    Name
                  </span>
                  <input
                    id="name"
                    type="text"
                    placeholder="Insert your name"
                    className={`${styles["inputs__input"]}`}
                  />
                </label>

                <label htmlFor="mail" className={`${styles["inputs__label"]}`}>
                  <span className={`${styles["inputs__label-title"]}`}>
                    Email Address
                  </span>
                  <input
                    className={`${styles["inputs__input"]}`}
                    id="mail"
                    type="text"
                    placeholder="alexei@mail.com"
                  />
                </label>

                <label htmlFor="phone" className={`${styles["inputs__label"]}`}>
                  <span className={`${styles["inputs__label-title"]}`}>
                    Phone Number
                  </span>
                  <input
                    className={`${styles["inputs__input"]}`}
                    id="phone"
                    type="text"
                    placeholder="+1 202-555-0136"
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
                  className={`${styles["inputs__label"]}`}
                >
                  <span className={`${styles["inputs__label-title"]}`}>
                    Address
                  </span>
                  <input
                    className={`${styles["inputs__input"]}`}
                    id="address"
                    type="text"
                    placeholder="1137 Williams Avenue"
                  />
                </label>

                <label
                  htmlFor="zip-code"
                  className={`${styles["inputs__label"]}`}
                >
                  <span className={`${styles["inputs__label-title"]}`}>
                    ZIP Code
                  </span>
                  <input
                    className={`${styles["inputs__input"]}`}
                    id="zip-code"
                    type="text"
                    placeholder="10001"
                  />
                </label>

                <label htmlFor="city" className={`${styles["inputs__label"]}`}>
                  <span className={`${styles["inputs__label-title"]}`}>
                    City
                  </span>
                  <input
                    className={`${styles["inputs__input"]}`}
                    id="city"
                    type="text"
                    placeholder="New York"
                  />
                </label>
                <label
                  htmlFor="countryy"
                  className={`${styles["inputs__label"]}`}
                >
                  <span className={`${styles["inputs__label-title"]}`}>
                    Country
                  </span>
                  <input
                    className={`${styles["inputs__input"]}`}
                    id="country"
                    type="text"
                    placeholder="United States"
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
                    className={`${styles["inputs__input"]} ${styles["--radio"]}`}
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
                  />
                  <span className={`${styles["inputs__label-title"]}`}>
                    Cash on Delivery
                  </span>
                </label>
              </div>
            </div>
            <div className={`${styles["inputs__details-container"]}`}>
              <div className={`${styles["inputs__labels-container"]}`}>
                <label
                  htmlFor="e-money-number"
                  className={`${styles["inputs__label"]}`}
                >
                  <span className={`${styles["inputs__label-title"]}`}>
                    e-Money Number
                  </span>
                  <input
                    className={`${styles["inputs__input"]}`}
                    id="e-money-number"
                    type="text"
                    placeholder="238521993"
                  />
                </label>

                <label
                  htmlFor="e-money-pin"
                  className={`${styles["inputs__label"]}`}
                >
                  <span className={`${styles["inputs__label-title"]}`}>
                    e-Money PIN
                  </span>
                  <input
                    className={`${styles["inputs__input"]}`}
                    id="e-money-pin"
                    type="text"
                    placeholder="6891"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div>{/* <h3>Summary</h3> */}</div>
      </form>
    </section>
  );
}
