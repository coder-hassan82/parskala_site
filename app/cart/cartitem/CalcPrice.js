import style from "@/app/_style/ShopCart.module.css";
import Link from "next/link";

export default function CalcPrice({ totalPrice, cartItems }) {
  const handleNextStep = () => {
    const orderData = {
      items: cartItems,
      totalPrice,
    };
    localStorage.setItem("order-data", JSON.stringify(orderData));
  };

  return (
    <div className={style.leftSide}>
      <h2 className={style.header}>صورتحساب</h2>
      <div className={style.priceContainer}>
        <div className={style.perProduct}>
          <p>قیمت محصولات ({cartItems.length})</p>
          <p>{totalPrice.toLocaleString()} تومان</p>
        </div>
        <div className={style.discount}>
          <p>تخفیف</p>
          <p>0 تومان</p>
        </div>
        <div className={style.finalPrice}>
          <p>جمع کل</p>
          <p>{totalPrice.toLocaleString()} تومان</p>
        </div>

        <Link
          href="/cart/shipment"
          className={style.nextBtn}
          onClick={handleNextStep}
        >
          ادامه خرید
        </Link>
      </div>
    </div>
  );
}
