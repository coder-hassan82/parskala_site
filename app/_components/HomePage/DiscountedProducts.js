import DiscountedProductsList from "./DiscountedProductsList";
import DataFetcher from "./ProductFetcher";

export default function DiscountedProducts() {
  return (
    <DataFetcher type="discounted">
      {(products) => <DiscountedProductsList products={products} />}
    </DataFetcher>
  );
}
