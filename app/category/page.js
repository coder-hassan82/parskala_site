import style from "@/app/_style/Category.module.css";
import Filter from "./Filter";
import CategoryList from "./CategoryList";
import { getProductsWithImages } from "../_server/data-server";

export default async function Page() {
  const { products, error } = await getProductsWithImages();
  // const products = [];
  return (
    <div className={style.parent}>
      <CategoryList products={products} />
      <Filter products={products} />
    </div>
  );
}
