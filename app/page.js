import Banner from "@/app/_components/HomePage/Banner";
import SliderCategory from "@/app/_components/HomePage/SliderCategory";
import style from "@/app/_style/HomePage.module.css";
import OurFeature from "./_components/HomePage/OurFeature";
import LatestProducts from "./_components/HomePage/LatestProducts";
import DiscountedProducts from "./_components/HomePage/DiscountedProducts";
import PopularProducts from "./_components/HomePage/PopularProducts";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <div className={style.container}>
      <Banner />
      <SliderCategory />
      <Suspense fallback={<Loading />}>
        <LatestProducts />
        <DiscountedProducts />
      </Suspense>
      <OurFeature />
      <Suspense fallback={<Loading />}>
        <PopularProducts />
      </Suspense>
    </div>
  );
}
