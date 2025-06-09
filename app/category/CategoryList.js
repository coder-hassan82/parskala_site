"use client";

import style from "@/app/_style/Category.module.css";
import Sort from "./Sort";
import CategoryItem from "./CategoryItem";
import Pageination from "./Pageination";
import { useRouter } from "next/router"; // ← فقط از useRouter استفاده می‌کنیم
import { useEffect, useState } from "react";

export default function CategoryList({ products }) {
  const router = useRouter();
  const searchParams = router.query;
  const pathName = router.pathname;
  const [filteredProducts, setFilteredProducts] = useState(products);

  const currentPage = parseInt(searchParams.page || "1");
  const itemsPerPage = 8;

  useEffect(() => {
    const minPrice = parseInt(searchParams.price_min || "0");
    const maxPrice = parseInt(searchParams.price_max || "100000000");
    const available = searchParams.available === "true";
    const categories = searchParams.category?.split(",") || [];
    const orderby = searchParams.orderby || "newest";
    const searchQuery = searchParams.search?.toLowerCase() || "";

    const updatedProducts = products.filter((product) => {
      const finalPrice = product.discount
        ? product.price * ((100 - product.discount) / 100)
        : product.price;

      const priceInRange = finalPrice >= minPrice && finalPrice <= maxPrice;
      const isAvailable = available ? product.quantity > 0 : true;
      const inSelectedCategory = categories.length
        ? categories.includes(product.categories?.name)
        : true;

      const matchesSearch = product.name?.toLowerCase().includes(searchQuery);

      return priceInRange && isAvailable && inSelectedCategory && matchesSearch;
    });

    const sortedProducts = updatedProducts.sort((a, b) => {
      if (orderby === "newest")
        return new Date(b.created_at) - new Date(a.created_at);
      if (orderby === "most-popular") return b.popularity - a.popularity;
      if (orderby === "most-expensive") return b.price - a.price;
      if (orderby === "cheapest") return a.price - b.price;
      return 0;
    });

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    if (currentPage > totalPages && totalPages > 0) {
      const params = new URLSearchParams(router.query);
      params.set("page", "1");
      router.replace(`${pathName}?${params.toString()}`);
    }

    setFilteredProducts(sortedProducts);
  }, [searchParams, products]);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page) => {
    const params = new URLSearchParams(router.query);
    params.set("page", page.toString());
    router.replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className={style.categoryList}>
      <Sort products={filteredProducts} />
      <CategoryItem products={paginatedProducts} />
      <Pageination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
