import data from "@/data/data.json";
import { ProductParams } from "@/types/types";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const categories = data;

  return categories.map((item) => ({
    category: item.category,
    slug: item.slug,
  }));
}

export default async function Product({
  params,
}: {
  params: Promise<ProductParams>;
}) {
  const resolvedParams = await params;

  const categoryWithSlugData = data.find(
    (item) =>
      item.category === resolvedParams.category &&
      item.slug === resolvedParams.slug
  );

  if (!categoryWithSlugData) {
    notFound(); // Jeśli nie ma kategorii, wtedy notFound
  }
  return <div>{resolvedParams.slug}</div>;
}
