"use client";
import styles from "./styles/home.module.scss";
import Hero from "./components/Hero";
import CategoryCardList from "./components/ui/CategoryCardList";

export default function Home() {
  return (
    <>
      <Hero />
      <div className={styles["category-card-list-home"]}>
        <CategoryCardList listType="normal" />
      </div>
    </>
  );
}
