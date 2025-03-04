import CategoryProductsCardsList from "@/components/ui/CategoryProductsCardsList";
import CategoryCardList from "@/components/ui/CategoryCardList";
import data from "@/data/data.json";
import { CategoryParams } from "@/types/types";
import { notFound } from "next/navigation";
import styles from "@/styles/categoryPage.module.scss";
import FeatureBlock from "@/components/ui/FeatureBlock";

export async function generateStaticParams() {
  const categories = data.map((item) => item.category);

  return categories.map((category) => ({
    category: category,
  }));
}

export default async function Category({
  params,
}: {
  params: Promise<CategoryParams>;
}) {
  const resolvedParams = await params;

  const categoryData = data.filter(
    (item) => item.category === resolvedParams.category
  );

  //Posortowanie, żeby te co mają new były pierwsze
  const sortCategoryDataByNewProduct = categoryData.sort(
    (a, b) => +b.new - +a.new
  ); //+b.new i +a.new - konwersja boolean na number 1 to true, 0 to false

  //console.log(sortCategoryDataByNewProduct);

  if (sortCategoryDataByNewProduct.length === 0) {
    notFound(); // Jeśli nie ma kategorii, wtedy notFound
  }

  console.log(sortCategoryDataByNewProduct);

  return (
    <>
      <h2 className={`${styles["category-title"]}`}>
        {resolvedParams.category}
      </h2>

      <section className={`wrapper ${styles["category-products-section"]}`}>
        <CategoryProductsCardsList data={sortCategoryDataByNewProduct} />
      </section>
      <div className={`wrapper ${styles["category-card-list"]}`}>
        <CategoryCardList listType="normal" />
      </div>
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
    </>
  );
}
