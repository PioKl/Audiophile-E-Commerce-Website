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

export interface ProductDetails {
  image: ProductImage;
  new: boolean;
  name: string;
  description: string;
  price: number;
  others: Others[];
}

export interface Others {
  image: ProductImage;
  slug: string;
  name: string;
}

export interface Includes {
  quantity: number;
  item: string;
}

export interface ProductFeatures {
  features: string;
  includes: Includes[];
}
