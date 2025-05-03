"use client";
import style from "@/app/_style/DashBord.module.css";
import { faGratipay } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRightToBracket,
  faCircleUser,
  faDolly,
  faLocationCrosshairs,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "../_components/context";

export default function Navigation() {
  const pathname = usePathname();
  const { user } = useUser();
  return (
    <div className={style.div2}>
      <div className={style.userNameTitle}>
        <FontAwesomeIcon icon={faCircleUser} />
        <span>{user.full_name}</span>
      </div>

      <div className={style.navigation}>
        <Link
          href="/dashbord/profile"
          className={`${style.navigationItem} ${
            pathname === "/dashbord/profile" ? style.active : ""
          }`}
        >
          <FontAwesomeIcon icon={faUserPen} />
          مشخصات فردی
        </Link>
        <Link
          href="/dashbord/orders"
          className={`${style.navigationItem} ${
            pathname === "/dashbord/orders" ? style.active : ""
          }`}
        >
          <FontAwesomeIcon icon={faDolly} />
          سفارش های من
        </Link>
        <Link
          href="/dashbord/favorite"
          className={`${style.navigationItem} ${
            pathname === "/dashbord/favorite" ? style.active : ""
          }`}
        >
          <FontAwesomeIcon icon={faGratipay} /> کالاهای مورد علاقه
        </Link>
        <Link
          href="/dashbord/address"
          className={`${style.navigationItem} ${
            pathname === "/dashbord/address" ? style.active : ""
          }`}
        >
          <FontAwesomeIcon icon={faLocationCrosshairs} />
          نشانی های من
        </Link>
        <Link
          href="/dashbord/profile1"
          className={`${style.navigationItem} ${
            pathname === "/dashbord/profile1" ? style.active : ""
          }`}
        >
          <FontAwesomeIcon icon={faArrowRightToBracket} />
          خروج
        </Link>
      </div>
    </div>
  );
}
