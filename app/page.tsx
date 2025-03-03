"use client";
import styles from "./styles/home.module.scss";
import Hero from "./components/Hero";
import CategoryCardList from "./components/ui/CategoryCardList";
import ProductBanner from "./components/ui/ProductBanner";
import FeatureBlock from "./components/ui/FeatureBlock";
export default function Home() {
  return (
    <>
      <Hero />
      <div className={styles["category-card-list-home"]}>
        <CategoryCardList listType="normal" />
      </div>
      <section className={styles["product-banner-list-section"]}>
        <ProductBanner
          type="one"
          productName="ZX9 Speaker"
          imageMobile="/assets/home/desktop/image-speaker-zx9.png"
          imageTablet="/assets/home/tablet/image-speaker-zx9.png"
          imageDesktop="/assets/home/desktop/image-speaker-zx9.png"
        />
        <ProductBanner
          type="two"
          productName="ZX7 Speaker"
          imageMobile="/assets/home/mobile/image-speaker-zx7.jpg"
          imageTablet="/assets/home/tablet/image-speaker-zx7.jpg"
          imageDesktop="/assets/home/desktop/image-speaker-zx7.jpg"
        />
        <ProductBanner
          type="three"
          productName="YX1 Earphones"
          imageMobile="/assets/home/mobile/image-earphones-yx1.jpg"
          imageTablet="/assets/home/tablet/image-earphones-yx1.jpg"
          imageDesktop="/assets/home/desktop/image-earphones-yx1.jpg"
        />
      </section>
      <section className={styles["feature-section"]}>
        <FeatureBlock
          heading="Bringing you the best audio gear"
          headingWordToColor={4}
          text="Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment."
          imageMobile="/assets/shared/mobile/image-best-gear.jpg"
          imageTablet="/assets/shared/tablet/image-best-gear.jpg"
          imageDesktop="/assets/shared/desktop/image-best-gear.jpg"
        />
      </section>
    </>
  );
}
