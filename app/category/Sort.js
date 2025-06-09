"use client";
import style from "@/app/_style/Category.module.css";
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Sort({ products }) {
  const [selected, setSelected] = useState("newest");
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(router.query);
    params.set("orderby", selected);
    router.replace(`${router.pathname}?${params.toString()}`);
  }, [selected]);

  return (
    <div className={style.sortContainer}>
      <div className={style.part1}>
        <div className={style.sortTitle}>
          <FontAwesomeIcon icon={faArrowDownShortWide} />
          <span>مرتب سازی:</span>
        </div>
        <div className={style.sortBtnGroup}>
          <button
            onClick={() => setSelected("newest")}
            className={`${selected === "newest" && style.activeOrder}`}
          >
            جدیدترین
          </button>
          <button
            onClick={() => setSelected("most-popular")}
            className={`${selected === "most-popular" && style.activeOrder}`}
          >
            محبوبترین
          </button>
          <button
            onClick={() => setSelected("most-expensive")}
            className={`${selected === "most-expensive" && style.activeOrder}`}
          >
            گرانترین
          </button>
          <button
            onClick={() => setSelected("cheapest")}
            className={`${selected === "cheapest" && style.activeOrder}`}
          >
            ارزانترین
          </button>
        </div>
      </div>
      <p className={style.numberProducts}>{products.length} کالا</p>
    </div>
  );
}
