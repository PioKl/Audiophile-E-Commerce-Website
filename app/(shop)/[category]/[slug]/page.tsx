import data from "@/data/data.json";
import { ProductParams } from "@/types/types";
import { notFound } from "next/navigation";
import ProductDetailsCard from "@/components/ui/ProductDetailsCard";
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
      <section className={styles["product-details-also-like-section"]}>
        <h3 className={styles["product-details-also-like-section__heading"]}>
          You May Also Like
        </h3>
        <ul
          className={
            styles["product-details-also-like-section__also-like-cards-list"]
          }
        >
          <ProductDetailsCard
            type="also-like"
            productDetailsData={categoryWithSlugData}
          />
        </ul>
      </section>
    </div>
  );
}
