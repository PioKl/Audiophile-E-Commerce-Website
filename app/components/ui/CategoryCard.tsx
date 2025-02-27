import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/ui/categoryCard.module.scss";
import Button from "../Button";

interface CategoryCardProps {
  type: "normal" | "menu";
  categoriesWithImage: {
    category: string;
    categoryThumbnail: string;
  };
}

export default function CategoryCard({
  type,
  categoriesWithImage,
}: CategoryCardProps) {
  return (
    <div className={`${styles["card-container"]} ${styles[`--${type}`]}`}>
      <div
        className={`${styles["card-container__image-container"]} ${
          styles[`--${type}`]
        }`}
      >
        <Image
          className={styles["card-container__image"]}
          src={categoriesWithImage.categoryThumbnail}
          alt="category image"
          fill
          sizes="100%"
        />
      </div>
      <span
        className={`${styles["card-container__category-name"]} ${
          styles[`--${type}`]
        }`}
      >
        {categoriesWithImage.category}
      </span>
      {type === "menu" && (
        <Link
          className={`nav-link ${styles["card-container__menu-link"]}`}
          href={`/${categoriesWithImage.category}`}
        >
          {categoriesWithImage.category}
        </Link>
      )}
      <Link
        className={`${styles["card-container__link"]} ${styles[`--${type}`]}`}
        href={`/${categoriesWithImage.category}`}
      >
        <Button buttonType="three" text="Shop" />
      </Link>
    </div>
  );
}
