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
  id: number;
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

export interface Features {
  features: string;
  includes: Includes[];
}

export interface Gallery {
  first: ProductImage;
  second: ProductImage;
  third: ProductImage;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface ExtendedCartItem extends CartItem {
  cartImage: string | null;
}

export interface CheckoutData {
  name: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  paymentMethod: "e-money" | "cash-on-delivery";
  eMoneyNumber?: string;
  eMoneyPin?: string;
}
