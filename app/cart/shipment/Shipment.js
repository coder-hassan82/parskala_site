"use client";

import style from "@/app/_style/ShopCart.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { submitOrders } from "@/app/_server/data-server";
import { useUser } from "@/app/_components/context";

export default function ShipMent() {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const handleSubmitOrder = async () => {
    const orderData = JSON.parse(localStorage.getItem("order-data") || "{}");

    if (!user?.id || !orderData?.address_id || !orderData?.items?.length) {
      alert("اطلاعات سفارش ناقص است.");
      return;
    }

    try {
      setLoading(true);
      const result = await submitOrders(user.id, orderData); // ⬅️ اینجا await اضافه شد

      if (result?.orderError || result?.itemsError) {
        console.error("خطا:", result);
        alert("مشکلی در ثبت سفارش پیش آمده است.");
        return;
      }

      localStorage.removeItem("order-data");
      router.push("/cart/final");
    } catch (err) {
      console.error("خطا در ثبت سفارش:", err.message);
      alert("مشکلی در ثبت سفارش به وجود آمده است.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.leftSide}>
      <h2 className={style.header}>صورتحساب</h2>
      <div className={style.priceContainer}>
        <div className={style.perProduct}>
          <p>هزینه پست</p>
          <p>50,000 تومان</p>
        </div>
        <button
          className={style.nextBtn}
          onClick={handleSubmitOrder}
          disabled={loading}
        >
          {loading ? "در حال ثبت سفارش..." : "ادامه خرید"}
        </button>
      </div>
    </div>
  );
}
