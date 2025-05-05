import React, { HTMLAttributes } from "react";
import styles from "@/styles/ui/loader.module.scss";

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Loader({ className }: LoaderProps) {
  return (
    <div className={`${styles["loader-container"]}`}>
      <div className={`${styles["loader"]} ${className}`}></div>
    </div>
  );
}
