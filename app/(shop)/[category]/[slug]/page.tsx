import data from "@/data/data.json";
import { ProductParams } from "@/types/types";
import { notFound } from "next/navigation";
import ProductDetailsCard from "@/components/ui/ProductDetailsCard";
import ProductFeatures from "@/components/ui/ProductFeatures";
import ProductGallery from "@/components/ui/ProductGallery";
import CategoryCardList from "@/components/ui/CategoryCardList";
import FeatureBlock from "@/components/ui/FeatureBlock";
import styles from "@/styles/productDetailsPage.module.scss";

export async function generateStaticParams() {
  const categories = data;

  return categories.map((item) => ({
    category: item.category,
    slug: item.slug,
  }));
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<ProductParams>;
}) {
  const resolvedParams = await params;

  const categoryWithSlugData = data.find(
    (item) =>
      item.category === resolvedParams.category &&
      item.slug === resolvedParams.slug
  );

  console.log(categoryWithSlugData);

  if (!categoryWithSlugData) {
    notFound(); // Jeśli nie ma kategorii, wtedy notFound
  }

  return (
    <div className="wrapper">
      <span>{resolvedParams.slug}</span>

      <ProductDetailsCard
        type="details"
        productDetailsData={categoryWithSlugData}
      />
      <ProductFeatures
        features={categoryWithSlugData.features}
        includes={categoryWithSlugData.includes}
      />
      <ProductGallery gallery={categoryWithSlugData.gallery} />
      <div className={styles["product-details-also-like"]}>
        <h3 className={styles["product-details-also-like__heading"]}>
          You May Also Like
        </h3>
        <ul
          className={styles["product-details-also-like__also-like-cards-list"]}
        >
          <ProductDetailsCard
            type="also-like"
            productDetailsData={categoryWithSlugData}
          />
        </ul>
      </div>

      <section className="category-card-list-pages">
        <CategoryCardList listType="normal" />
      </section>

      <section className="feature-section">
        <FeatureBlock
          heading="Bringing you the best audio gear"
          headingWordToColor={4}
          text="Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment."
          imageMobile="/assets/shared/mobile/image-best-gear.jpg"
          imageTablet="/assets/shared/tablet/image-best-gear.jpg"
          imageDesktop="/assets/shared/desktop/image-best-gear.jpg"
        />
      </section>
    </div>
  );
}
