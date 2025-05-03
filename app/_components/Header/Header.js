"use client";
import { useState } from "react";
import style from "@/app/_style/Header.module.css";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import ButtonLogin from "./ButtonLogin";
import ShopCart from "./ShopCart";
import Navigation from "./Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={style.container}>
      <div className={style.section}>
        <header className={style.header}>
          <button
            className={style.hamburger}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <Logo />
        </header>

        <div className={style.secondRow}>
          <SearchBox />
          <div className={style.miniNav}>
            <ButtonLogin />
            <ShopCart />
          </div>
        </div>
      </div>

      <nav className={`${style.navigation} ${isMenuOpen ? style.open : ""}`}>
        <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </nav>
    </div>
  );
}
