"use client";
import style from "@/app/_style/Category.module.css";
import "@/app/_style/multi.css";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import { useRouter } from "next/router";

export default function Filter({ products }) {
  return (
    <div className={style.filter}>
      <AvailableProduct />
      <FilterByPrice products={products} />
      <FilterCategory products={products} />
    </div>
  );
}

function AvailableProduct() {
  const router = useRouter();
  const query = router.query;

  const isChecked = query.available === "true";

  const handleChange = (e) => {
    const params = new URLSearchParams(router.query);
    if (e.target.checked) {
      params.set("available", "true");
    } else {
      params.delete("available");
    }
    router.replace(`${router.pathname}?${params.toString()}`);
  };

  return (
    <form className={style.availableProduct}>
      <input
        type="checkbox"
        id="availableProduct"
        checked={isChecked}
        onChange={handleChange}
      />
      <label htmlFor="availableProduct">نمایش کالاهای موجود</label>
    </form>
  );
}

function FilterByPrice({ products }) {
  const router = useRouter();
  const query = router.query;

  const prices = products.map((product) =>
    product.discount
      ? product.price * ((100 - product.discount) / 100)
      : product.price
  );

  const absoluteMin = Math.floor(Math.min(...prices));
  const absoluteMax = Math.ceil(Math.max(...prices));

  const [minValue, setMinValue] = useState(
    Number(query.price_min) || absoluteMin
  );
  const [maxValue, setMaxValue] = useState(
    Number(query.price_max) || absoluteMax
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleFilter = () => {
    const params = new URLSearchParams(router.query);
    params.set("price_min", minValue.toString());
    params.set("price_max", maxValue.toString());
    router.replace(`${router.pathname}?${params.toString()}`);
  };

  return (
    <div className={style.filterByPrice}>
      <div
        className={style.headerModule}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p>فیلتر بر اساس قیمت:</p>
        <FontAwesomeIcon
          icon={isOpen ? faAngleUp : faAngleDown}
          className={isOpen ? style.faAngleUp : style.faAngleDown}
        />
      </div>

      {isOpen && (
        <div className={style.bodyModule}>
          <MultiRangeSlider
            className={style.myCustomSlider}
            min={absoluteMin}
            max={absoluteMax}
            maxValue={maxValue}
            minValue={minValue}
            canMinMaxValueSame={true}
            onInput={(e) => {
              setMinValue(e.minValue);
              setMaxValue(e.maxValue);
            }}
            label={false}
            ruler={false}
            style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
            barLeftColor="#ddd"
            barInnerColor="#ff6600"
            barRightColor="#ddd"
            thumbLeftColor="#fff"
            thumbRightColor="#fff"
          />
          <div className={style.priceRange}>
            <span>{maxValue.toLocaleString()} تومان</span>
            <span>{minValue.toLocaleString()} تومان</span>
          </div>
          <button className={style.filterButton} onClick={handleFilter}>
            فیلتر
          </button>
        </div>
      )}
    </div>
  );
}

function FilterCategory({ products }) {
  const router = useRouter();
  const query = router.query;

  const categories = Array.from(
    new Set(products.map((product) => product.categories?.name).filter(Boolean))
  );
  const [isOpen, setIsOpen] = useState(false);

  const selectedCategories = query.category?.split(",") || [];

  const toggleCategory = (cat) => {
    const params = new URLSearchParams(router.query);
    let updated = [...selectedCategories];

    if (updated.includes(cat)) {
      updated = updated.filter((item) => item !== cat);
    } else {
      updated.push(cat);
    }

    if (updated.length > 0) {
      params.set("category", updated.join(","));
    } else {
      params.delete("category");
    }

    router.replace(`${router.pathname}?${params.toString()}`);
  };

  return (
    <div className={style.filterByPrice}>
      <div
        className={style.headerModule}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <p>فیلتر بر دسته بندی:</p>
        <FontAwesomeIcon
          icon={isOpen ? faAngleUp : faAngleDown}
          className={isOpen ? style.faAngleUp : style.faAngleDown}
        />
      </div>

      {isOpen && (
        <div className={style.bodyModule}>
          <ul className={style.listOfCategory}>
            {categories.map((cat) => (
              <li className={style.itemOfCategory} key={cat}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                <label>{cat}</label>
              </li>
            ))}
          </ul>
          <button className={style.filterButton}>فیلتر</button>
        </div>
      )}
    </div>
  );
}
