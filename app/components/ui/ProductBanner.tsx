import styles from "@/styles/ui/productBanner.module.scss";
import data from "@/data/data.json";
import Image from "next/image";
import Button from "../Button";
import { useMediaQuery } from "@mui/material";
import resolutions from "@/styles/base/resolutions.module.scss";
import imageSpeakerDesktop from "@/assets/home/desktop/image-speaker-zx9.png";
import imageSpeakerTablet from "@/assets/home/tablet/image-speaker-zx9.png";
import imageSpeakerMobile from "@/assets/home/desktop/image-speaker-zx9.png";
import imageSpeakerTwoDesktop from "@/assets/home/desktop/image-speaker-zx7.jpg";
import imageSpeakerTwoTablet from "@/assets/home/tablet/image-speaker-zx7.jpg";
import imageSpeakerTwoMobile from "@/assets/home/mobile/image-speaker-zx7.jpg";

import imageEarphoneDesktop from "@/assets/home/desktop/image-earphones-yx1.jpg";
import imageEarphoneTablet from "@/assets/home/tablet/image-earphones-yx1.jpg";
import imageEarphoneMobile from "@/assets/home/mobile/image-earphones-yx1.jpg";

interface ProductBannerProps {
  type: "one" | "two" | "three";
  productName: string;
}

export default function ProductBanner({
  type,
  productName,
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
    ? `url(${imageSpeakerTwoDesktop.src})`
    : isTablet
    ? `url(${imageSpeakerTwoTablet.src})`
    : `url(${imageSpeakerTwoMobile.src})`;

  const backgroundImageEarphone = isDesktopSmall
    ? `url(${imageEarphoneDesktop.src})`
    : isTablet
    ? `url(${imageEarphoneTablet.src})`
    : `url(${imageEarphoneMobile.src})`;

  return (
    <>
      {type === "one" && (
        <div className={`wrapper ${styles["product-banner"]}`}>
          <div className={styles["product-banner__container"]}>
            <div className={styles["product-banner__image-container"]}>
              <picture>
                <source
                  media={`(min-width: ${resolutions.bpDesktopSmall})`}
                  srcSet={imageSpeakerDesktop.src}
                />
                <source
                  media={`(min-width: ${resolutions.bpTablet})`}
                  srcSet={imageSpeakerTablet.src}
                />
                <Image
                  className={styles["product-banner__image"]}
                  src={imageSpeakerMobile}
                  alt="product-image"
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
