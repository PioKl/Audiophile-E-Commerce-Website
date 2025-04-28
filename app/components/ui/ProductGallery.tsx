"use client";
import { Gallery } from "@/interfaces/interfaces";
import resolutions from "@/styles/base/resolutions.module.scss";
import styles from "@/styles/ui/productGallery.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProductGalleryProps {
  gallery: Gallery;
}

export default function ProductGallery({ gallery }: ProductGalleryProps) {
  return (
    <motion.div
      className={styles["product-gallery"]}
      viewport={{ once: true }}
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: { duration: 0.75, ease: "easeIn" },
      }}
    >
      <ul className={styles["product-gallery__items-list"]}>
        {Object.values(gallery).map((item, id) => (
          <li
            key={id}
            className={`${styles["product-gallery__item"]} ${styles["product-gallery__image-container"]}`}
            data-id={id}
          >
            <picture>
              <source
                media={`(min-width: ${resolutions.bpDesktopSmall})`}
                srcSet={item.desktop}
              />
              <source
                media={`(min-width: ${resolutions.bpTablet})`}
                srcSet={item.tablet}
              />
              <Image
                className={`${styles["product-gallery__image"]}`}
                src={item.mobile}
                alt="gallery-image"
                width="0"
                height="0"
                sizes="100vw"
                priority
                style={{ objectFit: "cover" }}
              />
            </picture>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
