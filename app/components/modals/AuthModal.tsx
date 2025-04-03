import { Modal } from "@mui/material";
import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import styles from "@/styles/ui/muiModal.module.scss";
import stylesForm from "@/styles/ui/form.module.scss";
import Button from "../Button";
import axios from "axios";
import AuthContext from "@/contexts/AuthContext";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
});

interface AuthModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AuthModal({ open, setOpen }: AuthModalProps) {
  const { setIsUserLoggedIn } = useContext(AuthContext);
  const handleClose = () => setOpen(false);

  const [isLogin, setIsLogin] = useState(true); //logowanie, bądź rejestracja

  const [values, setValues] = useState({
    email: "",
    password: "",
    repeatPassword: "", //Tylko do rejestracji
  });

  //Typ dla błędów
  //<string - czyli klucze mogą być dowolnymi ciągami znaków np. emailEmpty
  //false | string> - wartości mogą być albo false, albo string
  type Errors = Record<string, false | string>;

  const [errors, setErrors] = useState<Errors>({
    backendOrNetworkError: false,
    emailEmpty: false,
    passwordEmpty: false,
    wrongEmailOrPassword: false, //Tylko dla loginu
    emailTaken: false, //Tylko dla rejestracji
    repeatPassword: false, //Tylko dla rejestracji
    passwordsCompare: false, //Tylko dla rejestracji
    passwordMinimumCharacters: false, //Tylko dla rejestracji
    passwordCapitalLetterAndSpecialCharacter: false, //Tylko dla rejestracji
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Resetowanie błędów przed nowym żądaniem
    //Object.fromEntries konwertuje tę tablicę z powrotem na obiekt.
    //Object.keys(prevErrors) zwraca tablicę kluczy obiektu prevErrors (np. ["emailEmpty", "passwordEmpty", ...])
    //map((key) => [key, false]) tworzy tablicę par klucz-wartość, gdzie każda wartość to false (np. [["emailEmpty", false], ["passwordEmpty", false], ...]).
    setErrors((prevErrors) =>
      Object.fromEntries(Object.keys(prevErrors).map((key) => [key, false]))
    );

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

      //dane do wysłania
      const payload = isLogin
        ? { userEmail: values.email, password: values.password }
        : {
            userEmail: values.email,
            password: values.password,
            repeatPassword: values.repeatPassword,
          };

      const response = await apiClient.post(endpoint, payload);
      const { token } = response.data;

      // Zapis tokenu w localStorage i aktualizacja stanu logowania
      localStorage.setItem("token", token);
      setIsUserLoggedIn(true);
      handleClose(); // Zamknięcie modala po sukcesie
      //Toast potwierdzający zalogowanie/zarejestrowanie
      toast.success(isLogin ? "Logged in" : "Signed up");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const backendErrors = error.response.data;
        //Błąd serwera lub inny ogólny komunikat
        if (backendErrors.message) {
          console.log("Error from server:", backendErrors.message); //Logowanie szczegółów
          setErrors((prevErrors) => ({
            ...prevErrors,
            backendOrNetworkError: "Something Went Wrong",
          }));
        } else {
          // Szczegółowe błędy z backendu
          /*           setErrors({
            backendOrNetworkError: false,
            emailEmpty: backendErrors.emailEmpty || false,
            passwordEmpty: backendErrors.passwordEmpty || false,
            wrongEmailOrPassword: backendErrors.wrongEmailOrPassword || false,
            emailTaken: backendErrors.emailTaken || false,
            repeatPassword: backendErrors.repeatPassword || false,
            passwordsCompare: backendErrors.passwordsCompare || false,
            passwordMinimumCharacters:
              backendErrors.passwordMinimumCharacters || false,
            passwordCapitalLetterAndSpecialCharacter:
              backendErrors.passwordCapitalLetterAndSpecialCharacter || false,
          }); */
          //To co poniżej działa tak jak powyżej
          setErrors((prevErrors) => {
            return Object.fromEntries(
              Object.keys(prevErrors).map((key) => [
                key,
                backendErrors[key] || false,
                //backendErrors.emailEmpty to jest to samo co backendErrors['emailEmpty'], a w dynamicznych kluczach trzeba zastosować rozwiązanie z backendErrors[key]
              ])
            );
          });
        }
      } else {
        //Nieoczekiwany błąd (np. brak odpowiedzi serwera)
        console.log("Unexpected error:", error);
        setErrors((prevErrors) => ({
          ...prevErrors,
          backendOrNetworkError: "Something Went Wrong",
        }));
      }
    }
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
        <form
          onSubmit={handleSubmit}
          className={`${stylesForm["form"]} ${stylesForm["--auth"]}`}
        >
          <div className={`${stylesForm["inputs"]}`}>
            <div
              className={`${stylesForm["inputs__labels-container"]} ${stylesForm["--auth"]}`}
            >
              <label
                htmlFor="email"
                className={`${stylesForm["inputs__label"]} ${
                  (errors.emailEmpty || errors.emailTaken) &&
                  stylesForm["--error"]
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
                          {errors.emailEmpty}
                        </span>
                      )
                    : (errors.emailEmpty || errors.emailTaken) && (
                        <span
                          className={`${stylesForm["inputs__label-error"]}`}
                        >
                          {errors.emailEmpty || errors.emailTaken}
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
                  (errors.passwordEmpty ||
                    errors.passwordMinimumCharacters ||
                    errors.passwordCapitalLetterAndSpecialCharacter) &&
                  stylesForm["--error"]
                }`}
              >
                <div
                  className={`${stylesForm["inputs__label-title-container"]}`}
                >
                  <span className={`${stylesForm["inputs__label-title"]}`}>
                    Password
                  </span>
                  <span className={`${stylesForm["inputs__label-error"]}`}>
                    {[
                      errors.passwordEmpty,
                      errors.passwordMinimumCharacters,
                      errors.passwordCapitalLetterAndSpecialCharacter,
                    ].find(Boolean)}
                  </span>
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
              {isLogin && errors.wrongEmailOrPassword && (
                <span className={`${stylesForm["inputs__wrong-data-error"]}`}>
                  {errors.wrongEmailOrPassword}
                </span>
              )}
              {isLogin && errors.backendOrNetworkError && (
                <span className={`${stylesForm["inputs__wrong-data-error"]}`}>
                  {errors.backendOrNetworkError}
                </span>
              )}

              {!isLogin && (
                <>
                  <label
                    htmlFor="repeat-password"
                    className={`${stylesForm["inputs__label"]} ${
                      (errors.repeatPassword || errors.passwordsCompare) &&
                      stylesForm["--error"]
                    }`}
                  >
                    <div
                      className={`${stylesForm["inputs__label-title-container"]}`}
                    >
                      <span className={`${stylesForm["inputs__label-title"]}`}>
                        Repeat Password
                      </span>
                      {(errors.repeatPassword || errors.passwordsCompare) && (
                        <span
                          className={`${stylesForm["inputs__label-error"]}`}
                        >
                          {errors.repeatPassword || errors.passwordsCompare}
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
                  {errors.backendOrNetworkError && (
                    <span
                      className={`${stylesForm["inputs__wrong-data-error"]}`}
                    >
                      {errors.backendOrNetworkError}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          <Button
            buttonType="one"
            text={isLogin ? "Login" : "Create an account"}
            isALink={false}
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
