"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "@/app/_style/PopularProducts.module.css";
import Link from "next/link";
import ProducDetail from "@/app/_components/HomePage/ProducDetail";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  className: `${style.slider}`,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 580,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
};

export default function DiscountedProductsList({ products }) {
  return (
    <div className={style.containerSlider}>
      <div className={style.sideBar}>
        <div className={style.title}>
          <img src="./side-ads-1.png" />
        </div>
        <button className={style.showAllBtn}>
          <Link href="/">نمایش همه</Link>
        </button>
      </div>
      <div className={style.sliderBox}>
        <Slider {...settings}>
          {products?.map((item, i) => (
            <ProducDetail key={i} value={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} ${style.nextArrow}`} // اضافه کردن کلاس دلخواه شما
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} ${style.prevArrow}`} // اضافه کردن کلاس دلخواه شما
      onClick={onClick}
    />
  );
}
