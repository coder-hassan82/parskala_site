"use client";
import { useState, useEffect, useRef } from "react";
import style from "@/app/_style/Header.module.css";
import Link from "next/link";
import {
  faAddressCard,
  faBars,
  faCircleXmark,
  faHouse,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navigation({ isMenuOpen, setIsMenuOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdown.current && !dropdown.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`${style.navigation} ${isMenuOpen ? style.open : ""}`}>
      <div className={style.navItem} onClick={() => setIsOpen(!isOpen)}>
        {isMenuOpen && (
          <button
            className={style.closeMenu}
            onClick={() => setIsMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}
        <div className={style.category}>
          <FontAwesomeIcon icon={faBars} />
          <span>دسته‌بندی‌ها</span>
        </div>
        {isOpen && (
          <div className={style.dropdown} ref={dropdown}>
            <Link
              href="category?orderby=newest&category=بافت+و+سویشرت"
              className={style.dropdownItem}
            >
              بافت و سویشرت
            </Link>
            <Link
              href="category?orderby=newest&category=شال+و+روسری"
              className={style.dropdownItem}
            >
              شال و روسری
            </Link>
            <Link
              href="category?orderby=newest&category=پالتو"
              className={style.dropdownItem}
            >
              پالتو
            </Link>
            <Link
              href="category?orderby=newest&category=شلوار"
              className={style.dropdownItem}
            >
              شلوار
            </Link>
            <Link
              href="category?orderby=newest&category=کفش"
              className={style.dropdownItem}
            >
              کفش
            </Link>
            <Link
              href="category?orderby=newest&category=کیف"
              className={style.dropdownItem}
            >
              کیف
            </Link>
            <Link
              href="category?orderby=newest&category=اکسسوری"
              className={style.dropdownItem}
            >
              اکسسوری
            </Link>{" "}
            <Link
              href="category?orderby=newest&category=لباس+راحتی"
              className={style.dropdownItem}
            >
              لباس زیر و راحتی
            </Link>
          </div>
        )}
      </div>
      <div className={style.category}>
        <FontAwesomeIcon icon={faHouse} />
        <Link href="/" className={style.navItem}>
          صفحه اصلی
        </Link>
      </div>
      <div className={style.category}>
        <FontAwesomeIcon icon={faListUl} />
        <Link href="/category" className={style.navItem}>
          لیست کالاها
        </Link>
      </div>
      <div className={style.category}>
        <FontAwesomeIcon icon={faAddressCard} />
        <Link href="/contact-us" className={style.navItem}>
          تماس با ما
        </Link>
      </div>
    </div>
  );
}
