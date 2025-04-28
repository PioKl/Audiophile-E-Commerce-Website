"use client";
import { ProductDetails } from "@/interfaces/interfaces";
import { useState, useContext } from "react";
import styles from "@/styles/ui/productDetailsCard.module.scss";
import Image from "next/image";
import Button from "../Button";
import resolutions from "@/styles/base/resolutions.module.scss";
import data from "@/data/data.json";
import { addToCart } from "@/utils/api";
import { toast } from "react-toastify";
import CartContext from "@/contexts/CartContext";
import { motion } from "framer-motion";

interface ProductDetailsCardProps {
  type: "details" | "also-like";
  productDetailsData: ProductDetails;
}

export default function ProductDetailsCard({
  type,
  productDetailsData,
}: ProductDetailsCardProps) {
  const { refreshCart } = useContext(CartContext);
  const { id, image, name, description, price, others } = productDetailsData;

  /*   const findCategoryAndAddIntoOthers = others.map((itemOthers) => {
    const sameSlug = data.find((itemData) => itemData.slug === itemOthers.slug);
    if (sameSlug) {
      return { ...itemOthers, category: sameSlug.category };
    }
  }); */

  const findCategoryForOthers = others.map((itemOthers) => {
    const sameSlug = data.find((itemData) => itemData.slug === itemOthers.slug);
    if (sameSlug) {
      return sameSlug.category;
    }
  });

  const [counter, setCounter] = useState(1);

  const handleDecreaseQuantity = () => {
    setCounter((prevCounter) =>
      prevCounter > 1 ? prevCounter - 1 : prevCounter
    );
  };

  const handleIncreaseQuantity = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleAddToCart = async () => {
    try {
      const newItem = { id: id, name: name, price: price, quantity: counter };
      await addToCart(newItem);
      await refreshCart();
      toast.success("Product added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error && typeof error === "object" && "response" in error) {
        const err = error as {
          response: { status: number; statusText: string };
        };
        if (err.response.status === 401) {
          toast.error("Please login to add items to your cart");
        } else {
          console.log(err.response.statusText);
          toast.error("Something went wrong");
        }
      } else if (error instanceof Error) {
        console.log(error.message);
        toast.error("Something went wrong");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      {type === "details" && (
        <motion.div
          className={`${styles["product-card"]}`}
          viewport={{ once: true }}
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            transition: { duration: 0.75, ease: "easeIn" },
          }}
        >
          <div className={`${styles["product-card__image-container"]}`}>
            <picture>
              <source
                media={`(min-width: ${resolutions.bpDesktopSmall})`}
                srcSet={image.desktop}
              />
              <source
                media={`(min-width: ${resolutions.bpTablet})`}
                srcSet={image.tablet}
              />
              <Image
                className={`${styles["product-card__image"]}`}
                src={image.mobile}
                alt="product-image"
                width="0"
                height="0"
                sizes="100vw"
                priority
                style={{ objectFit: "cover" }}
              />
            </picture>
          </div>
          <div className={styles["product-card__product-info-container"]}>
            {productDetailsData.new && (
              <span
                className={`overline ${styles["product-card__product-info-status"]}`}
              >
                New Product
              </span>
            )}
            <h2 className={styles["product-card__product-info-heading"]}>
              {name}
            </h2>
            <p
              className={`${styles["product-card__product-info-description"]}`}
            >
              {description}
            </p>
            <h6 className={styles["product-card__product-info-price"]}>
              $ {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </h6>
            <div className={styles["product-card__add-to-cart-container"]}>
              <div
                className={
                  styles["product-card__add-to-cart-quantity-container"]
                }
              >
                <button
                  onClick={handleDecreaseQuantity}
                  className={`${styles["product-card__add-to-cart-quantity-button"]}`}
                >
                  -
                </button>
                <span
                  className={`${styles["product-card__add-to-cart-quantity"]}`}
                >
                  {counter}
                </span>
                <button
                  onClick={handleIncreaseQuantity}
                  className={`${styles["product-card__add-to-cart-quantity-button"]}`}
                >
                  +
                </button>
              </div>
              <Button
                buttonType="one"
                text="Add to Cart"
                isALink={false}
                onClick={handleAddToCart}
              />
            </div>
          </div>
        </motion.div>
      )}
      {type === "also-like" &&
        others.map((item, id) => (
          <motion.li
            className={styles["product-card__also-like-card-item"]}
            key={id}
            viewport={{ once: true }}
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { duration: 0.75, ease: "easeIn" },
            }}
          >
            <div
              className={`${styles["product-card__image-container"]} ${
                styles[`--${type}`]
              }`}
            >
              <picture>
                <source
                  media={`(min-width: ${resolutions.bpDesktopSmall})`}
                  srcSet={item.image.desktop}
                />
                <source
                  media={`(min-width: ${resolutions.bpTablet})`}
                  srcSet={item.image.tablet}
                />
                <Image
                  className={`${styles["product-card__image"]}`}
                  src={item.image.mobile}
                  alt="product-image"
                  width="0"
                  height="0"
                  sizes="100vw"
                  priority
                  style={{ objectFit: "cover" }}
                />
              </picture>
            </div>
            <div
              className={`${styles["product-card__product-info-container"]} ${
                styles[`--${type}`]
              } `}
            >
              <h5 className={styles["product-card__product-info-heading"]}>
                {item.name}
              </h5>
              <Button
                buttonType="one"
                text="See Product"
                isALink={true}
                link={`/${findCategoryForOthers[id]}/${item.slug}`}
              />
            </div>
          </motion.li>
        ))}
    </>
  );
}
