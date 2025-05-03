"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // برای هدایت به صفحه جدید
import { useParams } from "next/navigation";
import style from "@/app/_style/NavBar.module.css";
import {
  faCommentDots,
  faFileLines,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function NavBar() {
  const pathname = usePathname(); // برای گرفتن مسیر فعلی
  const { productId } = useParams(); // برای دریافت productId از URL

  return (
    <div className={style.navBar}>
      <ul className={style.list}>
        <li
          className={`${style.navbarItem} ${
            pathname === `/${productId}/details` ? style.active : ""
          }`}
        >
          <Link href={`/${productId}/details`}>
            <FontAwesomeIcon icon={faFileLines} />
            <span>مشخصات</span>
          </Link>
        </li>
        <li
          className={`${style.navbarItem} ${
            pathname === `/${productId}/reviews` ? style.active : ""
          }`}
        >
          <Link href={`/${productId}/reviews`}>
            <FontAwesomeIcon icon={faCommentDots} />
            <span>نظرات</span>
          </Link>
        </li>
        <li
          className={`${style.navbarItem} ${
            pathname === `/${productId}/questions` ? style.active : ""
          }`}
        >
          <Link href={`/${productId}/questions`}>
            <FontAwesomeIcon icon={faLightbulb} />
            <span>پرسش پاسخ</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
