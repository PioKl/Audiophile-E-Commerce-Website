import { useMemo } from "react";
import { CartItem, ExtendedCartItem } from "@/interfaces/interfaces";
import data from "@/data/data.json";

export const useCartWithImage = (cart: CartItem[] | ExtendedCartItem[]) => {
  const shipping = 50;
  const vat = 0.2; //20% VAt

  const cartWithImageData = useMemo<ExtendedCartItem[]>(() => {
    return cart.map((cartItem) => {
      const matchingData = data.find(
        (dataItem) => dataItem.name === cartItem.name
      );

      return {
        ...cartItem,
        cartImage: matchingData ? matchingData.cartImage : null,
      };
    });
  }, [cart]);

  const totalPrice = useMemo(() => {
    return cartWithImageData.reduce(
      (total, currentValue) =>
        (total = total + currentValue.price * currentValue.quantity),
      0
    );
  }, [cartWithImageData]);

  const includedVat = useMemo(() => {
    return totalPrice * vat;
  }, [totalPrice]);

  const totalPriceWithShipping = useMemo(() => {
    return totalPrice + shipping;
  }, [totalPrice]);

  return {
    cartWithImageData,
    totalPrice,
    includedVat,
    totalPriceWithShipping,
    shipping,
  };
};
