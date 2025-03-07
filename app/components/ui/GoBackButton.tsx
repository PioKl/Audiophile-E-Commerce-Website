"use client";

import { useRouter } from "next/navigation";
import styles from "@/styles/ui/goBackButton.module.scss";

export default function GoBackButton() {
  const router = useRouter();

  const handleGoBack = () => {
    //2, bo np. jak użytkownik wjedzie pierwszy raz w przeglądarkę i wklei od razu link do towaru, wtedy jest właśnie 2, czyli jeszcze użytkownik nie był na stronie głównej, więc push("/")
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button className={styles["go-back"]} onClick={handleGoBack}>
      Go Back
    </button>
  );
}
