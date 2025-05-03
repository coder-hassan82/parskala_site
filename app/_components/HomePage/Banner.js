"use client";

import style from "@/app/_style/HomePage.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 774,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
  appendDots: (dots) => (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: "0px",
        position: "absolute",
        bottom: "0",
      }}
    >
      <ul style={{ margin: "0px", padding: "0px" }}> {dots} </ul>
    </div>
  ),
};

export default function Banner() {
  return (
    <div className={style.containerBanner}>
      <div className={style.rightBanner}>
        <Slider {...settings}>
          <div className={style.imageContainer}>
            <img src="./banners1.jpg" />
          </div>
          <div className={style.imageContainer}>
            <img src="./banners2.jpg" />
          </div>
        </Slider>
      </div>
      <div className={style.leftBannerTop}>
        <div className={style.imageContainer}>
          <img src="./banners1.jpg" />
        </div>
      </div>
      <div className={style.leftBannerBottom}>
        <div className={style.imageContainer}>
          <img src="./bannerbtn.jpg" />
        </div>
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
