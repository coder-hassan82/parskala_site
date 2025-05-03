"use client";
import style from "@/app/_style/ShopCart.module.css";
import {
  faBagShopping,
  faCreditCard,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const isStepDone = (stepPath) => {
    const steps = ["/cart/cartitem", "/cart/shipment", "/cart/cartitema"];
    const currentIndex = steps.indexOf(pathname);
    const stepIndex = steps.indexOf(stepPath);
    return currentIndex >= stepIndex;
  };

  return (
    <div className={style.navigation}>
      <Link
        href="/cart/cartitem"
        className={`${style.navigationItem} ${
          isStepDone("/cart/cartitem") ? style.activePage : ""
        }`}
      >
        <FontAwesomeIcon icon={faBagShopping} />
      </Link>
      <div
        className={`${style.line} ${
          isStepDone("/cart/shipment") ? style.fullLine : ""
        }`}
      ></div>
      <Link
        href="/cart/shipment"
        className={`${style.navigationItem} ${
          isStepDone("/cart/shipment") ? style.activePage : ""
        }`}
      >
        <FontAwesomeIcon icon={faTruckFast} />
      </Link>
      <div
        className={`${style.line} ${
          isStepDone("/cart/cartitema") ? style.fullLine : ""
        }`}
      ></div>
      <Link
        href="/cart/cartitema"
        className={`${style.navigationItem} ${
          isStepDone("/cart/cartitema") ? style.activePage : ""
        }`}
      >
        <FontAwesomeIcon icon={faCreditCard} />
      </Link>
    </div>
  );
}
