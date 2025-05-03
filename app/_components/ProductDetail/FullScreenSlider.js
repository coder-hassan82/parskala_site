import React, { useState } from "react";
import Image from "next/image";
import style from "@/app/_style/FullScreenSlider.module.css"; // استایل‌ها
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function CustomSlider({ images, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={style.sliderOverlay}>
      <div className={style.header}>
        <button className={style.closeBtn} onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className={style.sliderContainer}>
        <div className={style.sliderItem}>
          <Image src={images[currentIndex]} alt={`Slide ${currentIndex}`} fill/>
        </div>
        {/* Controls */}
        <button className={style.prevBtn} onClick={prevSlide}>
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </button>
        <button className={style.nextBtn} onClick={nextSlide}>
          <FontAwesomeIcon icon={faCircleChevronRight} />
        </button>
      </div>

      <div className={style.dots}>
        {images.map((img, index) => (
          <span
            key={index}
            className={`${style.dot} ${
              index === currentIndex ? style.activeDot : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index}`}
              width={40}
              height={50}
              quality={80}
              className={style.thumbnail}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
