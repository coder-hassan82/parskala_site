import style from "@/app/_style/ProductDetail.module.css";
import { getProductDetails } from "@/app/_server/data-server";
import BuyProduct from "./BuyProduct";
import ImageSlider from "./ImageSlider";

export default async function HeaderProductDeatail({ params }) {
  const { product, images, variants } = await getProductDetails(
    params.productId
  );
  const listImage = images.map((image) => image.image_url);
  return (
    <div className={style.container}>
      <ImageSlider images={listImage} />
      <BuyProduct product={product} variants={variants} />
    </div>
  );
}
