"use client";

import { useEffect, useState } from "react";
import style from "@/app/_style/ShopCart.module.css";
import ShopCartItem from "../ShopCartItem";
import CalcPrice from "./CalcPrice";
import { useUser } from "../../_components/context";
import { getShopCartItem } from "../../_server/data-server";

export default function Page() {
  const { shopCart, handleShopCart } = useUser();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!Array.isArray(shopCart) || shopCart.length === 0) return;

    const fetchData = async () => {
      const details = await Promise.all(
        shopCart.map(async (item) => {
          if (!item.variant_id) return null;

          const productDetails = await getShopCartItem(item.variant_id);
          if (productDetails) {
            return {
              ...productDetails,
              final_price: item.final_price,
              quantity: Math.floor(item.quantity),
            };
          }
          return null;
        })
      );

      setCartItems(details.filter((item) => item !== null));
    };

    fetchData();
  }, [shopCart]);

  // محاسبه قیمت کل
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.final_price * item.quantity,
    0
  );

  return (
    <div className={style.container}>
      <ShopCartItem cartItems={cartItems} setCartItems={setCartItems} />
      <CalcPrice totalPrice={totalPrice} cartItems={cartItems} />
    </div>
  );
}
