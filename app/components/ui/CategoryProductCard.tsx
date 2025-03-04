import { CategoryProduct } from "@/interfaces/interfaces";
import styles from "@/styles/ui/categoryProductCard.module.scss";
import Image from "next/image";
import Button from "../Button";
import resolutions from "@/styles/base/resolutions.module.scss";

interface CategoryProductCardProps {
  productCardData: CategoryProduct;
}

export default function CategoryProductCard({
  productCardData,
}: CategoryProductCardProps) {
  const { name, description, category, slug, categoryImage } = productCardData;

  return (
    <li className={`${styles["product-card"]}`}>
      <div className={`${styles["product-card__image-container"]}`}>
        <picture>
          <source
            media={`(min-width: ${resolutions.bpDesktopSmall})`}
            srcSet={categoryImage.mobile}
          />
          <source
            media={`(min-width: ${resolutions.bpTablet})`}
            srcSet={categoryImage.tablet}
          />
          <Image
            className={`${styles["product-card__image"]}`}
            src={categoryImage.desktop}
            alt="product-image"
            width="0"
            height="0"
            sizes="100vw"
            priority
            style={{ objectFit: "cover" }}
          />
        </picture>
      </div>
      <div className={styles["product-card__product-info-container"]}>
        {productCardData.new && (
          <span
            className={`overline ${styles["product-card__product-info-status"]}`}
          >
            New Product
          </span>
        )}
        <h2 className={styles["product-card__product-info-heading"]}>{name}</h2>
        <p className={`${styles["product-card__product-info-description"]}`}>
          {description}
        </p>
        <Button
          buttonType="one"
          text="See Product"
          isALink={true}
          link={`${category}/${slug}`}
        />
      </div>
    </li>
  );
}
