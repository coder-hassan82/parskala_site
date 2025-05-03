"use client";

import style from "@/app/_style/Category.module.css";
import Image from "next/image";
import Link from "next/link";

export default function CategoryItem({ products }) {
  return (
    <div className={style.wrapper}>
      {products.length ? (
        products.map((item, i) => (
          <Link href={`/${item.id}`} key={i} className={style.prodoctContainer}>
            <div className={style.imgContainer}>
              <Image
                src={item.product_images[0]?.image_url}
                className={style.img}
                fill
                quality={10}
                alt="product poster"
              />
            </div>
            <h2 className={style.titleProduct}>{item.name}</h2>
            <div className={style.priceBox}>
              <p className={style.discount}>{item.discount}%</p>
              <div className={style.part2}>
                <p className={style.priceValue}>
                  {(
                    item.price -
                    (item.discount / 100) * item.price
                  ).toLocaleString()}{" "}
                  تومان
                </p>
                <p className={style.priceDiscount}>
                  {item.price.toLocaleString()}
                  تومان
                </p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className={style.notFound}>محصولی یافت نشد</p>
      )}
    </div>
  );
}
