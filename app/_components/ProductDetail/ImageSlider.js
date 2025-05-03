"use client";
import { useState } from "react";
import Image from "next/image";
import style from "@/app/_style/ProductDetail.module.css";
import FullScreenSlider from "./FullScreenSlider";

export default function ImageSlider({ images }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // برای ذخیره‌ی ایندکس تصویر انتخاب‌شده

  const openSlider = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  // تعداد تصاویر برای تکمیل لیست تا 3
  const fillerImages = 3 - images.length;

  return (
    <div className={style.rigthSubContainer}>
      <div>
        {
          <ul className={style.listImage}>
            {images.length > 3 ? (
              <>
                {images.slice(0, 2).map((img, index) => (
                  <li
                    key={index}
                    onClick={() => openSlider(index)}
                    className={style.clickableImage}
                  >
                    <Image
                      src={img.image_url}
                      alt={`Product ${index}`}
                      fill
                      quality={20}
                    />
                  </li>
                ))}
                <li className={style.blurOverlay} onClick={() => openSlider(2)}>
                  <Image src={images[2]} alt="More images" fill quality={20} />
                  <button className={style.viewMoreBtn}>
                    + {images.length - 2}
                  </button>
                </li>
              </>
            ) : (
              <>
                {images.map((img, index) => (
                  <li
                    key={index}
                    onClick={() => openSlider(index)}
                    className={style.clickableImage}
                  >
                    <Image
                      src={img}
                      alt={`Product ${index}`}
                      fill
                      quality={20}
                    />
                  </li>
                ))}

                {[...Array(fillerImages)].map((_, index) => (
                  <li key={`empty-${index}`} className={style.empaty}></li>
                ))}
              </>
            )}
          </ul>
        }
      </div>
      {/* تصویر اصلی */}
      <div className={style.mainImage}>
        <Image src={images[0]} alt="Main Product" fill quality={60} />
      </div>

      {/* اسلایدشو وقتی که باز شده */}
      {isOpen && (
        <FullScreenSlider
          images={images}
          startIndex={currentIndex}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
