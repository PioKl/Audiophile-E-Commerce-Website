import CategoryProductCard from "./CategoryProductCard";
import { CategoryProduct } from "@/interfaces/interfaces";

import styles from "@/styles/ui/categoryProductsCardsList.module.scss";

interface CategoryProductsCardsListProps {
  data: CategoryProduct[];
}

export default function CategoryProductsCardsList({
  data,
}: CategoryProductsCardsListProps) {
  return (
    <ul className={styles["products-cards-list"]}>
      {data.map((item, id) => (
        <CategoryProductCard key={id} productCardData={item} />
      ))}
    </ul>
  );
}
