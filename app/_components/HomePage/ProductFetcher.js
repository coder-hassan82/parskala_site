// app/_server/DataFetcher.js
import { getProducts, getImage } from "@/app/_server/data-server";

export default async function DataFetcher({ type, children }) {
  let products = [];

  switch (type) {
    case "latest":
      products = (await getProducts()).products;
      break;
    case "discounted":
      products = (await getProducts()).products;
      break;
    case "popular":
      products = (await getProducts()).products;
      break;
  }

  // گرفتن تصاویر برای هر محصول
  const productsWithImages = await Promise.all(
    products.map(async (product) => {
      const { product_images } = await getImage(product.id);
      return { ...product, product_images };
    })
  );

  return children(productsWithImages);
}
