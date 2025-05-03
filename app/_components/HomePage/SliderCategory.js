"use client";

import style from "@/app/_style/HomePage.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 8,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1500,
  className: `${style.slider}`,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 530,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 400,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
};

const slide = [
  {
    url: "./p1.webp",
    title: "بافت و سویشرت",
    href: "category?orderby=newest&category=بافت+و+سویشرت",
  },
  {
    url: "./p2.webp",
    title: "شال و روسری",
    href: "category?orderby=newest&category=شال+و+روسری",
  },
  {
    url: "./p3.webp",
    title: "پالتو",
    href: "category?orderby=newest&category=پالتو",
  },
  {
    url: "./p4.webp",
    title: "شلوار",
    href: "category?orderby=newest&category=شلوار",
  },
  {
    url: "./p5.webp",
    title: "کفش",
    href: "category?orderby=newest&category=کفش",
  },
  {
    url: "./p6.webp",
    title: "کیف",
    href: "category?orderby=newest&category=کیف",
  },
  {
    url: "./p7.webp",
    title: "اکسسوری",
    href: "category?orderby=newest&category=اکسسوری",
  },
  {
    url: "./p8.webp",
    title: "لباس زیر و راحتی",
    href: "category?orderby=newest&category=لباس+راحتی",
  },
];

function SliderCategory() {
  return (
    <div className={style.categoryContainer}>
      <Slider {...settings}>
        {slide.map((item, i) => (
          <Link href={item.href} className={style.categoryItem} key={i + 1}>
            <div className={style.imageContainer}>
              <img src={item.url} />
            </div>
            <p className={style.title}>{item.title}</p>
          </Link>
        ))}
      </Slider>
    </div>
  );
}

export default SliderCategory;

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} ${style.nextItem}`} // اضافه کردن کلاس دلخواه شما
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} ${style.prevItem}`} // اضافه کردن کلاس دلخواه شما
      onClick={onClick}
    />
  );
}
