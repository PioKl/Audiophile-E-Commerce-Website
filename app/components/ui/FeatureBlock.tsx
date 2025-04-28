"use client";
import Image from "next/image";
import resolutions from "@/styles/base/resolutions.module.scss";
import styles from "@/styles/ui/featureBlock.module.scss";
import { motion } from "framer-motion";

interface FeatureBlockProps {
  heading: string;
  headingWordToColor?: number;
  text: string;
  imageMobile: string;
  imageTablet: string;
  imageDesktop: string;
}

export default function FeatureBlock({
  heading,
  headingWordToColor,
  text,
  imageMobile,
  imageTablet,
  imageDesktop,
}: FeatureBlockProps) {
  const colorWordFunction = () => {
    if (headingWordToColor === undefined) {
      return heading;
    }
    const arrayFromHeading = heading.split(/(\s+)/); //podział na słowa
    const arrayWithoutWhiteSpaces = arrayFromHeading.filter((item) =>
      item.trim()
    ); //słowa bez spacji

    //Gdyby numer słowa do pokolorowania był większy niż ilość słów
    if (headingWordToColor > arrayWithoutWhiteSpaces.length) {
      return heading;
    }
    const wordToColor = arrayWithoutWhiteSpaces[headingWordToColor - 1]; //jakie słowo będzie szukane
    const wordToColorIndex = arrayWithoutWhiteSpaces.indexOf(wordToColor); //index tego słowa w tablicy arrayWithoutWhiteSpaces

    //Join z dodaniem białych znaków w tym przypadku nie zadziała, dlatego znowu operowanie na arrayFromHeading w tym przypadku
    const headingWithColoredWord = arrayFromHeading.map((item, index) => {
      const isWordToColor =
        //index w arrayFromHeading szukanego słowa
        arrayWithoutWhiteSpaces.indexOf(item) === wordToColorIndex;
      if (isWordToColor) {
        return (
          <span key={index} style={{ color: "var(--c-main)" }}>
            {item}
          </span>
        );
      } else {
        return item;
      }
    });

    return headingWithColoredWord;
  };

  return (
    <motion.div
      className={`${styles.feature}`}
      viewport={{ once: true }}
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: 1,
        transition: { duration: 0.75, ease: "easeIn" },
      }}
    >
      <div className={styles["feature__image-container"]}>
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
            className={styles["feature__image"]}
            src={imageMobile}
            alt="feature-image"
            width="0"
            height="0"
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </picture>
      </div>

      <div className={styles["feature__info-container"]}>
        <h2 className={styles["feature__info-heading"]}>
          {colorWordFunction()}
        </h2>
        <p className={styles["feature__info-text"]}>{text}</p>
      </div>
    </motion.div>
  );
}
