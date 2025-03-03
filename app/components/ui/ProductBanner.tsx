import styles from "@/styles/ui/productBanner.module.scss";
import data from "@/data/data.json";
import Image from "next/image";
import Button from "../Button";
import { useMediaQuery } from "@mui/material";
import resolutions from "@/styles/base/resolutions.module.scss";

interface ProductBannerProps {
  type: "one" | "two" | "three";
  productName: string;
  imageMobile: string;
  imageTablet: string;
  imageDesktop: string;
}

export default function ProductBanner({
  type,
  productName,
  imageMobile,
  imageTablet,
  imageDesktop,
}: ProductBannerProps) {
  const filteredData = data.filter((item) => item.name === productName);

  const bannerData = filteredData.map(
    ({ slug, category, image, description }) => ({
      slug,
      category,
      image,
      description,
    })
  );

  const isDesktopSmall = useMediaQuery(
    `(min-width: ${resolutions.bpDesktopSmall})`
  );
  const isTablet = useMediaQuery(`(min-width: ${resolutions.bpTablet})`);

  const backgroundImage = isDesktopSmall
    ? `url(${imageDesktop})`
    : isTablet
    ? `url(${imageTablet})`
    : `url(${imageMobile})`;

  const backgroundImageEarphone = isDesktopSmall
    ? `url(${imageDesktop})`
    : isTablet
    ? `url(${imageTablet})`
    : `url(${imageMobile})`;

  return (
    <>
      {type === "one" && (
        <div className={`wrapper ${styles["product-banner"]}`}>
          <div className={styles["product-banner__container"]}>
            <div className={styles["product-banner__image-container"]}>
              <picture>
                <source
                  media={`(min-width: ${resolutions.bpDesktopSmall})`}
                  srcSet={imageDesktop}
                />
                <source
                  media={`(min-width: ${resolutions.bpTablet})`}
                  srcSet={imageTablet}
                />
                <Image
                  className={styles["product-banner__image"]}
                  src={imageMobile}
                  alt="product-image"
                  width="0"
                  height="0"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={100}
                />
              </picture>
            </div>

            <div className={styles["product-banner__product-info"]}>
              <h1 className={styles["product-banner__product-heading"]}>
                {productName}
              </h1>
              <p className={styles["product-banner__product-description"]}>
                Upgrade to premium speakers that are phenomenally built to
                deliver truly remarkable sound.
              </p>
              <Button
                buttonType="four"
                text="See Product"
                isALink={true}
                link={`${bannerData[0].category}/${bannerData[0].slug}`}
              />
            </div>
          </div>
        </div>
      )}
      {type === "two" && (
        <div
          style={{
            backgroundImage,
          }}
          className={`wrapper ${styles["product-banner"]} ${
            styles[`--${type}`]
          }`}
        >
          <div
            className={`${styles["product-banner__container"]} ${
              styles[`--${type}`]
            }`}
          >
            <div
              className={`${styles["product-banner__product-info"]} ${
                styles[`--${type}`]
              }`}
            >
              <h4
                className={`${styles["product-banner__product-heading"]} ${
                  styles[`--${type}`]
                }`}
              >
                {productName}
              </h4>

              <Button
                buttonType="two"
                text="See Product"
                isALink={true}
                link={`${bannerData[0].category}/${bannerData[0].slug}`}
              />
            </div>
          </div>
        </div>
      )}
      {type === "three" && (
        <div
          className={`wrapper ${styles["product-banner"]} ${
            styles[`--${type}`]
          }`}
        >
          <div
            className={`${styles["product-banner__container"]} ${
              styles[`--${type}`]
            }`}
          >
            <div
              style={{
                backgroundImage: backgroundImageEarphone,
              }}
              className={`${styles["product-banner__image-container"]} ${
                styles[`--${type}`]
              }`}
            ></div>

            <div
              className={`${styles["product-banner__product-info"]} ${
                styles[`--${type}`]
              }`}
            >
              <h4
                className={`${styles["product-banner__product-heading"]} ${
                  styles[`--${type}`]
                }`}
              >
                {productName}
              </h4>

              <Button
                buttonType="two"
                text="See Product"
                isALink={true}
                link={`/`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
