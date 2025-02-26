import data from "@/data/data.json";
import { CategoryParams } from "@/types/types";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const categories = data.map((item) => item.category);

  return categories.map((category) => ({
    category: category,
  }));
}

export default async function Category({
  params,
}: {
  params: Promise<CategoryParams>;
}) {
  const resolvedParams = await params;

  const categoryData = data.filter(
    (item) => item.category === resolvedParams.category
  );

  if (categoryData.length === 0) {
    notFound(); // Jeśli nie ma kategorii, wtedy notFound
  }
  return <div>{resolvedParams.category}</div>;
}
