import React from "react";
import styles from "@/styles/ui/loader.module.scss";

export default function Loader() {
  return (
    <div className={`${styles["loader-container"]}`}>
      <div className={`${styles["loader"]}`}></div>
    </div>
  );
}
