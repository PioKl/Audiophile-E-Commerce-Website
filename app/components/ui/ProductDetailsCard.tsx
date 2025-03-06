import { ProductDetails } from "@/interfaces/interfaces";
import styles from "@/styles/ui/productDetailsCard.module.scss";
import Image from "next/image";
import Button from "../Button";
import resolutions from "@/styles/base/resolutions.module.scss";
import data from "@/data/data.json";

interface ProductDetailsCardProps {
  type: "details" | "also-like";
  productDetailsData: ProductDetails;
}

export default function ProductDetailsCard({
  type,
  productDetailsData,
}: ProductDetailsCardProps) {
  const { image, name, description, price, others } = productDetailsData;

  /*   const findCategoryAndAddIntoOthers = others.map((itemOthers) => {
    const sameSlug = data.find((itemData) => itemData.slug === itemOthers.slug);
    if (sameSlug) {
      return { ...itemOthers, category: sameSlug.category };
    }
  }); */

  const findCategoryForOthers = others.map((itemOthers) => {
    const sameSlug = data.find((itemData) => itemData.slug === itemOthers.slug);
    if (sameSlug) {
      return sameSlug.category;
    }
  });

  return (
    <>
      {type === "details" && (
        <div className={`${styles["product-card"]}`}>
          <div className={`${styles["product-card__image-container"]}`}>
            <picture>
              <source
                media={`(min-width: ${resolutions.bpDesktopSmall})`}
                srcSet={image.desktop}
              />
              <source
                media={`(min-width: ${resolutions.bpTablet})`}
                srcSet={image.tablet}
              />
              <Image
                className={`${styles["product-card__image"]}`}
                src={image.mobile}
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
            {productDetailsData.new && (
              <span
                className={`overline ${styles["product-card__product-info-status"]}`}
              >
                New Product
              </span>
            )}
            <h2 className={styles["product-card__product-info-heading"]}>
              {name}
            </h2>
            <p
              className={`${styles["product-card__product-info-description"]}`}
            >
              {description}
            </p>
            <h6 className={styles["product-card__product-info-price"]}>
              $ {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h6>
            <div>
              <Button buttonType="one" text="Add to Cart" isALink={false} />
            </div>
          </div>
        </div>
      )}
      {type === "also-like" &&
        others.map((item, id) => (
          <li className={styles["product-card__also-like-card-item"]} key={id}>
            <div
              className={`${styles["product-card__image-container"]} ${
                styles[`--${type}`]
              }`}
            >
              <picture>
                <source
                  media={`(min-width: ${resolutions.bpDesktopSmall})`}
                  srcSet={item.image.desktop}
                />
                <source
                  media={`(min-width: ${resolutions.bpTablet})`}
                  srcSet={item.image.tablet}
                />
                <Image
                  className={`${styles["product-card__image"]}`}
                  src={item.image.mobile}
                  alt="product-image"
                  width="0"
                  height="0"
                  sizes="100vw"
                  priority
                  style={{ objectFit: "cover" }}
                />
              </picture>
            </div>
            <div
              className={`${styles["product-card__product-info-container"]} ${
                styles[`--${type}`]
              } `}
            >
              <h5 className={styles["product-card__product-info-heading"]}>
                {item.name}
              </h5>
              <Button
                buttonType="one"
                text="See Product"
                isALink={true}
                link={`/${findCategoryForOthers[id]}/${item.slug}`}
              />
            </div>
          </li>
        ))}
    </>
  );
}
