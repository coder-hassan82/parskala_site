import HeaderProductDeatail from "../_components/ProductDetail/HeaderProductDeatail";
import RelatedProducts from "../_components/ProductDetail/RelatedProducts";
import style from "@/app/_style/ProductDetail.module.css";
import NavBar from "./NavBar";
import { Suspense } from "react";
import Loading from "../loading";
import { getRelatedProducts } from "../_server/data-server";
export default async function Layout({ children, params }) {
  const { related, relatedError } = await getRelatedProducts(params.productId);
  return (
    <div className={style.page}>
      <Suspense fallback={<Loading />}>
        <HeaderProductDeatail params={params} />
      </Suspense>
      <NavBar productId={params.productId} />
      {children}
      <Suspense fallback={<Loading />}>
        <RelatedProducts list={related} />
      </Suspense>
    </div>
  );
}
