"use client";

import { useEffect, useState } from "react";
import { getProcessingOrders } from "@/app/_server/data-server";
import { useUser } from "@/app/_components/context";
import style from "@/app/_style/DashBord.module.css";

export default function OrderActiveTab1() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const { data, error } = await getProcessingOrders(user.id);
      if (!error) setOrders(data);
    };

    fetchOrders();
  }, [user]);

  if (orders?.length === 0) {
    return (
      <div className={style.noOreder}>
        <h4>سفارش فعالی در این صفحه وجود ندارد</h4>
        <img src="/order.webp" />
      </div>
    );
  }

  return (
    <div className={style.orderList}>
      {orders?.map((order) => (
        <div key={order.id} className={style.orderCard}>
          <div className={style.orderHeader}>
            <span>کد سفارش: {order.id}</span>
            <span>
              {new Date(order.created_at).toLocaleDateString("fa-IR")}
            </span>
          </div>
          <div className={style.orderStatus}>
            وضعیت:{" "}
            <span
              className={
                order.status === "processing" ? style.processing : style.status
              }
            >
              {order.status === "processing" ? "در حال پردازش" : order.status}
            </span>
            <p>
              <strong>قیمت کل:</strong>{" "}
              <span className={style.price}>
                {order.total_price?.toLocaleString("fa-IR")} تومان
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
