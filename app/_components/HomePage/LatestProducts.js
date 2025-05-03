import DataFetcher from "./ProductFetcher";
import LatestProductsList from "./LatestProductsList";

export default function LatestProducts() {
  return (
    <DataFetcher type="latest">
      {(products) => <LatestProductsList products={products} />}
    </DataFetcher>
  );
}
