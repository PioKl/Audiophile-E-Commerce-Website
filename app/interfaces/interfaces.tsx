export interface ProductImage {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface CategoryProduct {
  categoryImage: ProductImage;
  description: string;
  slug: string;
  name: string;
  category: string;
  new: boolean;
}
