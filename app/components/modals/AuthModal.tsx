import { Modal } from "@mui/material";
import { useState } from "react";
import Box from "@mui/material/Box";
import styles from "@/styles/ui/muiModal.module.scss";
import stylesForm from "@/styles/ui/form.module.scss";
import Button from "../Button";

interface AuthModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AuthModal({ open, setOpen }: AuthModalProps) {
  const handleClose = () => setOpen(false);

  const [isLogin, setIsLogin] = useState(true); //Tymczasowo

  const [errors, setErrors] = useState({
    emailEmpty: false,
    emailTaken: false, //Tylko do rejestracji
    passwordEmpty: false,
    repeatPassword: false, //Tylko do rejestracji
    passwordCompare: false, //Tylko do rejestracji
    wrongEmailOrPassword: false,
  });

  const [values, setValues] = useState({
    email: "",
    password: "",
    repeatPassword: "", //Tylko do rejestracji
    passwordCompare: "", //Tylko do rejestracji
  });

  const messages = {
    errorMessage: "Can’t be empty",
    wrongEmailOrPasswordMessage: "Wrong email or password",
    wrongRepeatPassword: "Password is different", //Tylko do rejestracji
    emailTaken: "Email is already taken", //Tylko do rejestracji
  };

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
        <h3 className={`${styles["modal-box-container_heading"]}`}>
          {isLogin ? "Login" : "Sign Up"}
        </h3>
        <form className={`${stylesForm["form"]} ${stylesForm["--auth"]}`}>
          <div className={`${stylesForm["inputs"]}`}>
            <div
              className={`${stylesForm["inputs__labels-container"]} ${stylesForm["--auth"]}`}
            >
              <label
                htmlFor="email"
                className={`${stylesForm["inputs__label"]} ${
                  errors.emailEmpty && stylesForm["--error"]
                }`}
              >
                <div
                  className={`${stylesForm["inputs__label-title-container"]}`}
                >
                  <span className={`${stylesForm["inputs__label-title"]}`}>
                    Email Address
                  </span>
                  {isLogin
                    ? errors.emailEmpty && (
                        <span
                          className={`${stylesForm["inputs__label-error"]}`}
                        >
                          {messages.errorMessage}
                        </span>
                      )
                    : (!errors.emailEmpty || !errors.emailTaken) && (
                        <span
                          className={`${stylesForm["inputs__label-error"]}`}
                        >
                          {errors.emailEmpty && messages.errorMessage}
                          {!errors.emailEmpty &&
                            errors.emailTaken &&
                            messages.emailTaken}
                        </span>
                      )}
                </div>

                <input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  autoComplete="username"
                  className={`${stylesForm["inputs__input"]}`}
                  value={values.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
              </label>
              <label
                htmlFor="password"
                className={`${stylesForm["inputs__label"]} ${
                  errors.passwordEmpty && stylesForm["--error"]
                }`}
              >
                <div
                  className={`${stylesForm["inputs__label-title-container"]}`}
                >
                  <span className={`${stylesForm["inputs__label-title"]}`}>
                    Password
                  </span>
                  {errors.passwordEmpty && (
                    <span className={`${stylesForm["inputs__label-error"]}`}>
                      {messages.errorMessage}
                    </span>
                  )}
                </div>

                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  className={`${stylesForm["inputs__input"]}`}
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                />
              </label>
              {isLogin &&
                !errors.emailEmpty &&
                !errors.passwordEmpty &&
                errors.wrongEmailOrPassword && (
                  <span className={`${stylesForm["inputs__wrong-data-error"]}`}>
                    {messages.wrongEmailOrPasswordMessage}
                  </span>
                )}

              {!isLogin && (
                <label
                  htmlFor="repeat-password"
                  className={`${stylesForm["inputs__label"]} ${
                    errors.repeatPassword && stylesForm["--error"]
                  }`}
                >
                  <div
                    className={`${stylesForm["inputs__label-title-container"]}`}
                  >
                    <span className={`${stylesForm["inputs__label-title"]}`}>
                      Repeat Password
                    </span>
                    {(errors.repeatPassword || errors.passwordCompare) && (
                      <span className={`${stylesForm["inputs__label-error"]}`}>
                        {errors.repeatPassword
                          ? messages.errorMessage
                          : messages.wrongRepeatPassword}
                      </span>
                    )}
                  </div>

                  <input
                    id="repeat-password"
                    type="password"
                    placeholder="Repeat Password"
                    autoComplete="current-password"
                    className={`${stylesForm["inputs__input"]}`}
                    value={values.repeatPassword}
                    onChange={(e) =>
                      setValues({ ...values, repeatPassword: e.target.value })
                    }
                  />
                </label>
              )}
            </div>
          </div>

          <Button
            buttonType="one"
            text={isLogin ? "Login" : "Create an account"}
            isALink={true}
            link="/"
          />
        </form>
        <p className={`${styles["modal-box-container__info"]}`}>
          {isLogin ? "Don’t have an account? " : "Already have an account? "}
          <button
            className={`${styles["modal-box-container__button"]}`}
            onClick={() => {
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </Box>
    </Modal>
  );
}
