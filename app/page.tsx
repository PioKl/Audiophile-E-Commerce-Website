"use client";
import styles from "./styles/home.module.scss";
import Hero from "./components/Hero";
import CategoryCardList from "./components/ui/CategoryCardList";
import ProductBanner from "./components/ui/ProductBanner";
export default function Home() {
  return (
    <>
      <Hero />
      <div className={styles["category-card-list-home"]}>
        <CategoryCardList listType="normal" />
      </div>
      <section className={styles["product-banner-list"]}>
        <ProductBanner type="one" productName="ZX9 Speaker" />
        <ProductBanner type="two" productName="ZX7 Speaker" />
        <ProductBanner type="three" productName="YX1 Earphones" />
      </section>
    </>
  );
}
