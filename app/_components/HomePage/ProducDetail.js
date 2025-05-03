"use client";

import style from "@/app/_style/NewProduct.module.css";
import Link from "next/link";

export default function ProducDetail({ value }) {
  const previousValue = value?.price;
  const currentValue = previousValue - 0.14 * previousValue;

  return (
    <div className={style.productBox}>
      <Link href={value.id}>
        <div className={style.imgContainer}>
          <img src={value?.product_images[0]?.image_url} alt={value?.name} />
        </div>
        <p className={style.productTitle}>{value?.name}</p>
        <div className={style.priceBpx}>
          <p className={style.discountAmoount}>14%</p>
          <div className={style.prices}>
            <p className={style.currentValue}>
              {currentValue.toLocaleString()}
            </p>
            <p className={style.previousValue}>
              {previousValue.toLocaleString()}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
