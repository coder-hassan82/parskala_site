import PopularProductsList from "./PopularProductsList";
import DataFetcher from "./ProductFetcher";

export default function PopularProducts() {
  return (
    <DataFetcher type="popular">
      {(products) => <PopularProductsList products={products} />}
    </DataFetcher>
  );
}
