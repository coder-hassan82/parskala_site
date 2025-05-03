"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "@/app/_style/NewProduct.module.css";
import Link from "next/link";
import ProducDetail from "@/app/_components/HomePage/ProducDetail";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
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
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 530,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
};

export default function LatestProductsList({ products }) {
  return (
    <div className={style.containerSlider}>
      <div className={style.headerSlider}>
        <h2 className={style.title}>جدیدترین محصولات</h2>
        <button className={style.showAllBtn}>
          <Link href="/">نمایش همه</Link>
        </button>
      </div>
      <div>
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
