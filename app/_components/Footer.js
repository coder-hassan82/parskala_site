"use client";
import { useState } from "react";
import style from "@/app/_style/Footer.module.css";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTelegram,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import logo from "@/public/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  return (
    <footer className={style.container}>
      <div className={style.col1}>
        <div className={style.imgContainer}>
          <img src={logo} />
        </div>
        <button className={style.upBtn} onClick={scrollToTop}>
          <Link href="#">
            <span>بازگشت به بالا</span>
            <FontAwesomeIcon icon={faChevronUp} />
          </Link>
        </button>
      </div>
      <div className={style.col2}>
        <ul className={style.list}>
          <li className={style.items}>
            <span>شماره تماس:</span>
            <span>061-535-10225</span>
          </li>
          <li className={style.items}>
            <span>آدرس ایمیل:</span>
            <span>info@parskala.com</span>
          </li>
          <li className={style.items}>
            <span>هفت روز هفته ، 24 ساعت شبانه‌روز پاسخگوی شما هستیم.</span>
          </li>
        </ul>
      </div>

      <div className={style.footerGrid}>
        {/* راهنمای خرید */}
        <div>
          <h3 className={style.sectionTitle}>راهنمای خرید</h3>
          <div className={style.links}>
            <Link href="#">نحوه ثبت سفارش</Link>
            <Link href="#">روش ارسال سفارش</Link>
            <Link href="#">شیوه‌های پرداخت</Link>
            <Link href="#">رویه‌های بازگرداندن کالا</Link>
          </div>
        </div>

        {/* پارس فشن */}
        <div>
          <h3 className={style.sectionTitle}>پارس فشن</h3>
          <div className={style.links}>
            <Link href="#">حریم خصوصی</Link>
            <Link href="#">شرایط استفاده</Link>
            <Link href="#">تماس با ما</Link>
            <Link href="#">پرسش‌های متداول</Link>
          </div>
        </div>

        <div></div>

        {/* شبکه‌های اجتماعی */}
        <div className={style.col3}>
          <h3 className={style.sectionTitle}>با ما همراه باشید</h3>
          <div className={style.socialIcons}>
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faTelegram} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faWhatsapp} />
            </a>
          </div>

          {/* فرم عضویت ایمیل */}
          <div className={style.col3}>
            <h3 className={style.sectionTitle}>
              از جدیدترین تخفیف‌ها باخبر شوید
            </h3>
            <div className={style.subscribeForm}>
              <input type="email" placeholder="آدرس ایمیل خود را وارد کنید" />
              <button>ثبت</button>
            </div>
          </div>
        </div>
      </div>
      {/* نمادهای اعتماد */}
      <div className={style.trustBadges}>
        <div>
          <h3 className={style.sectionTitle}>
            فروشگاه اینترنتی پارس کالا، بررسی، انتخاب و خرید آنلاین
          </h3>
          <p className={style.aboutUs}>
            پارس کالا به عنوان یکی از قدیمی‌ترین فروشگاه های اینترنتی با بیش از
            یک دهه تجربه، با پایبندی به سه اصل، پرداخت در محل، ۷ روز ضمانت
            بازگشت کالا و تضمین اصل‌بودن کالا موفق شده تا همگام با فروشگاه‌های
            معتبر جهان، به بزرگ‌ترین فروشگاه اینترنتی ایران تبدیل شود.
          </p>
        </div>
        <div className={style.enamad}>
          <div className={style.iconContainer}>
            <img src="/enamad.png" alt="نماد اعتماد ۱" />
          </div>
          <div className={style.iconContainer}>
            <img src="/samandehi.png" alt="نماد اعتماد ۲" />
          </div>
          <div className={style.iconContainer}>
            <img src="/etehad.png" alt="نماد اعتماد ۳" />
          </div>
        </div>
      </div>

      {/* کپی‌رایت */}
      <div className={style.copyright}>
        Copyright © 2025 - تمامی حقوق متعلق به پارس کالا است.
      </div>
    </footer>
  );
}
