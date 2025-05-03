import style from "@/app/_style/Header.module.css";
import { useUser } from "../context";
import Link from "next/link";

export default function ShopCart() {
  const { shopCart } = useUser();
  return (
    <Link href="/cart/cartitem" className={style.shopCartBox}>
      <div className={style.counter}>
        <span>{shopCart?.length || 0}</span>
      </div>
      <img src="./shopping-cart.png" className={style.shopCart} />
    </Link>
  );
}
