"use client";
import { createContext, useState, useCallback, useEffect } from "react";

type AuthContextType = {
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
};

const defaultAuthContext: AuthContextType = {
  isUserLoggedIn: false,
  setIsUserLoggedIn: () => {}, //Pusta funkcja jako domyślna
  logout: () => {}, //Pusta funkcja jako domyślna
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setIsUserLoggedIn(false);
  }, [setIsUserLoggedIn]);

  //Sprawdzenie ważności tokena
  const checkTokenValidity = useCallback(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const jwtPayload = JSON.parse(atob(token.split(".")[1]));
        const isTokenValid = jwtPayload.exp * 1000 > Date.now();

        if (isTokenValid) {
          setIsUserLoggedIn(true);
        } else {
          //Token wygasł, wyloguj użytkownika
          localStorage.removeItem("token");
          logout(); //Wylogowanie użytkownika
        }
      } catch (error) {
        console.error("Invaild token", error);
        localStorage.removeItem("token");
        logout(); //Wylogowanie użytkownika
      }
    } else {
      setIsUserLoggedIn(false);
    }
  }, [logout]);

  useEffect(() => {
    checkTokenValidity(); //Sprawdza ważność tokena na początku

    const interval = setInterval(checkTokenValidity, 60000); //Co minutę
    return () => clearInterval(interval); //Wyczyszczenie interwału przy odmontowywaniu komponentu
  }, [checkTokenValidity]);

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
