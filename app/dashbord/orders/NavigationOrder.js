"use client";
import style from "@/app/_style/DashBord.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationOrder() {
  const pathname = usePathname();

  return (
    <div className={style.profilePage}>
      <div className={style.headerPage}>
        <span>سفارش های من</span>
      </div>
      <div className={style.btnGroupe}>
        <Link
          href="/dashbord/orders/orderActiveTab1"
          className={`${
            pathname === "/dashbord/orders/orderActiveTab1"
              ? style.activeOrder
              : ""
          }`}
        >
          <span>در انتظار پرداخت</span>
          <span>0</span>
        </Link>
        <Link
          href="/dashbord/orders/orderActiveTab2"
          className={`${
            pathname === "/dashbord/orders/orderActiveTab2"
              ? style.activeOrder
              : ""
          }`}
        >
          <span>در حال پردازش</span>
          <span>0</span>
        </Link>
        <Link
          href="/dashbord/orders/orderActiveTab3"
          className={`${
            pathname === "/dashbord/orders/orderActiveTab3"
              ? style.activeOrder
              : ""
          }`}
        >
          <span>تحویل شده</span>
          <span>0</span>
        </Link>
        <Link
          href="/dashbord/orders/orderActiveTab4"
          className={`${
            pathname === "/dashbord/orders/orderActiveTab4"
              ? style.activeOrder
              : ""
          }`}
        >
          <span>مرجوعی</span>
          <span>0</span>
        </Link>
        <Link
          href="/dashbord/orders/orderActiveTab5"
          className={`${
            pathname === "/dashbord/orders/orderActiveTab5"
              ? style.activeOrder
              : ""
          }`}
        >
          <span>لغو شده و معلق</span>
          <span>0</span>
        </Link>
      </div>
    </div>
  );
}
