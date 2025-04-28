"use client";
import data from "@/data/data.json";
import Link from "next/link";
import CategoryCard from "./CategoryCard";
import styles from "@/styles/ui/categoryCardList.module.scss";
import { motion } from "framer-motion";

interface CategoryCardListProps {
  listType: "normal" | "menu";
}

export default function CategoryCardList({ listType }: CategoryCardListProps) {
  const categoriesAndImage = data.map((item) => ({
    category: item.category,
    categoryThumbnail: item.categoryThumbnail,
  }));
  //Pojedyncze kategorie z obrazkami z thumbnail
  const uniqueCategorysWithImage = categoriesAndImage.filter(
    (item, index, self) =>
      index === self.findIndex((x) => x.category === item.category)
  );

  return listType === "normal" ? (
    <>
      <motion.ul
        className={`${styles["card-list"]} ${styles[`--${listType}`]}`}
        viewport={{ once: true }}
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: { duration: 0.75, ease: "easeIn" },
        }}
      >
        {uniqueCategorysWithImage.map((item, id) => (
          <CategoryCard type="normal" key={id} categoriesWithImage={item} />
        ))}
      </motion.ul>
    </>
  ) : (
    <>
      <ul
        className={`wrapper ${styles["card-list"]} ${styles[`--${listType}`]}`}
      >
        <Link href="/" className={`nav-link ${styles["card-list__home-link"]}`}>
          Home
        </Link>
        {uniqueCategorysWithImage.map((item, id) => (
          <CategoryCard type="menu" key={id} categoriesWithImage={item} />
        ))}
      </ul>
    </>
  );
}
